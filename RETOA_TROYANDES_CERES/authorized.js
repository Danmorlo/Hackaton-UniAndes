const { execQuery, functions } = require("./db");

const collection_name = "auth";

const validate = (req) => {
  const token = req.header('Authorization') && req.header('Authorization').substring('Bearer '.length);
  const user = req.header('User') && JSON.parse(req.header('User'));

  return new Promise((resolve, reject) => {
    (async () => {
      if (user) {
        const data = await execQuery(functions.getOne, collection_name, { utype: user.utype, uid: +user.uid });
        
        if (data.token === token) {
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    })();
  })
};

module.exports = validate;
