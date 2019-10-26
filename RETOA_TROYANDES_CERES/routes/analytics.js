const express = require("express");
const router = express.Router({});
const { execQuery, functions } = require("../db");
const authorized = require('../authorized');
const Spline = require('cubic-spline');

function findLineByLeastSquares(values_x, values_y) {
  let sum_x = 0;
  let sum_y = 0;
  let sum_xy = 0;
  let sum_xx = 0;
  let count = 0;

  // We'll use those variables for faster read/write access.
  let x = 0;
  let y = 0;
  let values_length = values_x.length;

  if (values_length != values_y.length) {
    throw new Error('The parameters values_x and values_y need to have same size!');
  }

  // Nothing to do
  if (values_length === 0) {
    return [[], []];
  }

  // Calculate the sum for each of the parts necessary.
  for (let v = 0; v < values_length; v++) {
    x = values_x[v];
    y = values_y[v];
    sum_x += x;
    sum_y += y;
    sum_xx += x * x;
    sum_xy += x * y;
    count++;
  }

  // Calculate m and b for the formular: y = x * m + b
  let m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
  let b = (sum_y / count) - (m * sum_x) / count;

  // We will make the x and y result line now
  let result_values_x = [];
  let result_values_y = [];

  for (let v = 0; v < values_length; v++) {
    x = values_x[v];
    y = x * m + b;
    result_values_x.push(x);
    result_values_y.push(y);
  }

  return [result_values_x, result_values_y];
}

const getNextYofPoint = (data, attr) => {
  let x = [];
  let y = [];

  data.forEach((f, i) => {
    x.push(i + 1);
    y.push(f[attr]);
  });

  const spline = new Spline(x, y);
  const y2 = spline.at(x.length);

  return y2;
};

router.get('/productivityByProduct/:utype/:uid/product/:prod', (req, res, next) => {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const uid = +req.params.uid;
      const utype = req.params.utype;
      const prod = req.params.prod;

      const data = await execQuery(functions.getOne, 'following', { utype, uid });

      let x = [];
      let y = [];

      data.following
        .filter(f => f.product === prod)
        .forEach((f, i) => { x.push(i); y.push(f.productivity); })

      const lR = findLineByLeastSquares(x, y);
      const m = (lR[0][0] - lR[0][lR[0].length - 1]) / (lR[1][0] - lR[1][lR[1].length - 1]);
      res.send({ m, lR });
    } else {
      res.status(403);
      res.send('Not authorized');
    }
  })();
});

router.get('/potentialProducts/:utype/:uid', (req, res, next) => {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      // Cultives info
      const cultives = await execQuery(functions.get, 'cultives', {});

      const uid = +req.params.uid;
      const utype = req.params.utype;

      // Following data from user
      const data = await execQuery(functions.getOne, 'following', { utype, uid });

      // Linear Regresions from following data
      const nextHum = getNextYofPoint(data.following, 'humidity');
      const nextTemp = getNextYofPoint(data.following, 'temperature');
      const nextpH = getNextYofPoint(data.following, 'pH');

      let min = {
        cultive: null,
        value: Infinity
      };

      cultives.forEach(c => {

        const dH = Math.abs(c.humidity - nextHum);
        const dT = Math.abs(c.temperature - nextTemp);
        const dP = Math.abs(c.pH - nextpH);

        const sum = dH + dT + dP;

        if (sum < min.value) {
          min.value = sum;
          min.cultive = c;
        }
      });

      res.send(min);

    } else {
      res.status(403);
      res.send('Not authorized');
    }
  })();
});

router.get('/potentialNextFinantialValue/:utype/:uid', (req, res, next) => {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const uid = +req.params.uid;
      const utype = req.params.utype;

      const data = await execQuery(functions.getOne, 'creditStatus', { utype, uid });

      if (data) {
        const nextValue = getNextYofPoint(data.records, 'value');
        res.send({ nextValue });
      } else {
        res.status(404);
        res.send("User not found")
      }
    } else {
      res.status(403);
      res.send('Not authorized');
    }
  })();
});

module.exports = router;
