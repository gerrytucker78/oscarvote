var config = require('config');

var dbConfig = config.get('db');


var db = require("mongoose");
db.Promise = global.Promise;

var dbUrl = "mongodb://";

if (dbConfig.get("authRequired") == "true") {
  dbUrl = dbUrl + dbConfig.get("user") + ":" + dbConfig.get("password") + "@";
}

dbUrl = dbUrl + dbConfig.get("host") + "/" + dbConfig.get("db");

db.connect(dbUrl);

module.exports = db;
