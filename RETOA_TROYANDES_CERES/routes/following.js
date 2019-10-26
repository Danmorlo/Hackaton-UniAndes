const express = require("express");
const router = express.Router({});
const { execQuery, functions } = require("../db");
const authorized = require('../authorized');

const collection_name = "following";

router.get("/:utype/:uid", (req, res, next) => {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const uid = +req.params.uid;
      const utype = req.params.utype;

      const data = await execQuery(functions.getOne, collection_name, { utype, uid });
      res.send(data);
    } else {
      res.status(403);
      res.send('Not authorized');
    }
  })();
});

router.get("/last/:utype/:uid", (req, res, next) => {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const uid = +req.params.uid;
      const utype = req.params.utype;

      const data = await execQuery(functions.getOne, collection_name, { utype, uid });
      res.send(data.following[0]);
    } else {
      res.status(403);
      res.send('Not authorized');
    }
  })();
});

router.post('/:utype/:uid/productivity/:fid', (req, res, next) => {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const uid = +req.params.uid;
      const fid = +req.params.fid;
      const utype = req.params.utype;

      const body = req.body;

      await execQuery(
        functions.updateOne,
        collection_name,
        { utype, uid, "following.num": fid },
        { $set: { "following.$.productivity": body.productivity } }
      );
      res.send("OK");
    } else {
      res.status(403);
      res.send('Not authorized');
    }
  })();
});

router.post("/", (req, res, next) => {
  (async () => {
    const hasAuth = await authorized(req);
    if (hasAuth) {
      const body = req.body;
      const user = await execQuery(functions.getOne, collection_name, {})
      if (!user) {
        await execQuery(functions.createOne, collection_name, { uid: body.uid, utype: body.utype, following: [] });
      }
      await execQuery(
        functions.updateOne,
        collection_name,
        { uid: body.uid, utype: body.utype },
        { $push: { "following": { $each: body.following } } }
      );
      res.send('OK');
    } else {
      res.status(403);
      res.send('Not authorized');
    }
  })();
});

router.get('/supplies', (req, res, next) => {
  (async () => {
    const data = await execQuery(functions.get, 'supplies', {});
    res.send(data);
  })();
});

module.exports = router;
