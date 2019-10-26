const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGODB_URI;
const dbName = "heroku_4qdpqvx2";

const doResolve = (resolve) => {
  return (err, docs) => {
    if (err) throw err;
    resolve(docs);
  };
};

const doTry = (reject, fun) => {
  try {
    fun();
  } catch (error) {
    reject(error);
  }
};

const functions = {
  get(resolve, reject, db, collection_name, query = {}, limit = 100, sort = {}) {
    doTry(reject, () => {
      db.collection(collection_name)
        .find(query)
        .sort(sort)
        .limit(limit)
        .toArray(doResolve(resolve));
    });
  },
  getOne(resolve, reject, db, collection_name, query) {
    doTry(reject, () => {
      db.collection(collection_name)
        .findOne(query, doResolve(resolve));
    });
  },
  createOne(resolve, reject, db, collection_name, obj) {
    doTry(reject, () => {
      db.collection(collection_name)
        .insertOne(obj, doResolve(resolve));
    });
  },
  createMany(resolve, reject, db, collection_name, arrs) {
    doTry(reject, () => {
      db.collection(collection_name)
        .insertMany(arrs, doResolve(resolve));
    });
  },
  deleteOne(resolve, reject, db, collection_name, query) {
    doTry(reject, () => {
      db.collection(collection_name)
        .deleteOne(query, doResolve(resolve));
    });
  },
  deleteMany(resolve, reject, db, collection_name, query) {
    doTry(reject, () => {
      db.collection(collection_name)
        .deleteMany(query, doResolve(resolve));
    });
  },
  updateOne(resolve, reject, db, collection_name, query, values) {
    doTry(reject, () => {
      db.collection(collection_name)
        .updateOne(query, values, doResolve(resolve));
    });
  },
  updateMany(resolve, reject, db, collection_name, query, values) {
    doTry(reject, () => {
      db.collection(collection_name)
        .updateMany(query, values, doResolve(resolve));
    });
  },
  join(resolve, reject, db, collection_name, aggregate) {
    doTry(reject, () => {
      db.collection(collection_name)
        .aggregate(aggregate)
        .toArray(doResolve(resolve));
    });
  },
  replaceOne(resolve, reject, db, collection_name, query, value) {
    doTry(reject, () => {
      db.collection(collection_name)
        .replaceOne(query, value, { upsert: true }, doResolve(resolve));
    });
  }
};

const execQuery = async (func, collection_name, query, ...args) => {
  return new Promise((resolve, reject) => {
    doTry(reject, () => {
      MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        func(resolve, reject, client.db(dbName), collection_name, query, ...args);
        client.close();
      });
    });
  });
};

module.exports = {
  execQuery,
  functions
};
