const { execQuery, functions } = require("../db.js");
const express = require("express");
const router = express.Router({});
const authorized = require('../authorized');

const collection_name_credit = "creditStatus";
const collection_name_state = "financialStatus";


router.get("/credithistory/:userDocType/:userId", function (req, res, next) {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const userId = req.params.userId;
      const userDocType = req.params.userDocType;

      try {
        const result = await execQuery(functions.getOne, collection_name_credit, { "utype": userDocType, "uid": userId });
        res.send(JSON.stringify(result));
      } catch (error) {
        res.status(500);
      }

    }
    else {
      res.status(403);
      res.send("Not authorized");
    }
  })();
});

router.get("/recomendhistory/:userDocType/:userId", function (req, res, next) {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const userId = req.params.userId;
      const userDocType = req.params.userDocType;
      res.send("Estamos trabajando en ello");
    }
    else {
      res.sendStatus(403);
    }
  })();
});

router.get("/consultarsaldo/:userDocType/:userId", function (req, res, next) {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const userId = +req.params.userId;
      const userDocType = req.params.userDocType;
      try {
        const result = await execQuery(functions.getOne, collection_name_state, { "utype": userDocType, "uid": userId });
        res.send(JSON.stringify(result));
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    }
    else {
      res.sendStatus(403);
    }
  })();
});

router.post("/agregarsaldo", function (req, res, next) {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const body = req.body;
      const userDocType = body.userDocType;
      const userId = body.userId;
      const saldoAgregar = body.saldoAgregar;

      try {
        await execQuery(functions.updateOne, collection_name_state, { "utype": userDocType, "uid": userId }, { $inc: { "saldo": saldoAgregar } });
        res.status(200);
        res.send("OK");
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    }
    else {
      res.sendStatus(403);
    }
  })();
});

router.post("/retirarsaldo", function (req, res, next) {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const body = req.body;
      const userDocType = body.userDocType;
      const userId = body.userId;
      const saldoRetirar = body.saldoRetirar;
      try {
        await execQuery(functions.updateOne, collection_name_state, { "utype": userDocType, "uid": userId }, { $inc: { "saldo": -1 * saldoRetirar } });
        res.status(200);
        res.send("OK");
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    }
    else {
      res.sendStatus(403);
    }
  })();
});

router.post('/addHistorical', (req, res, next) => {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const body = req.body;
      const userDocType = body.userDocType;
      const userId = body.userId;
      const record = body.record;

      try {
        const user = await execQuery(functions.getOne, collection_name_credit, { "utype": userDocType, "uid": userId });

        if (!user) {
          await execQuery(functions.createOne, collection_name_credit, {
            utype: userDocType,
            uid: userId,
            records: []
          });
        }

        await execQuery(
          functions.updateOne,
          collection_name_credit,
          { "utype": userDocType, "uid": userId },
          { $push: { "records": { $each: record } } }
        );
        res.send("OK");
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    }
    else {
      res.sendStatus(403);
    }
  })();
});

router.get('/transactions/:utype/:uid', (req, res, next) => {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const uid = +req.params.uid;
      const utype = req.params.utype;

      const data = await execQuery(functions.get, 'transactions', { uid, utype });
      res.send(data);
    }
    else {
      res.sendStatus(403);
    }
  })();
});

router.post('/buy', (req, res, next) => {
  const body = req.body;
  if (Object.keys(body).length !== 0) {
    (async () => {
      const hasAuth = await authorized(req);
      if (hasAuth) {

        const data = await execQuery(functions.createOne, 'transactions', body);
        await execQuery(
          functions.updateOne,
          collection_name_state,
          { "utype": body.utype, "uid": body.uid },
          { $inc: { "saldo": -1 * body.value } }
        );
        res.send(data);
      }
      else {
        res.sendStatus(403);
      }
    })();
  } else {
    res.sendStatus(401);
  }
})

module.exports = router;