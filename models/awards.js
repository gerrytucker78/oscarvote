var db = require("./db.js");

var Schema = db.Schema({
  name: String,
  year: Number
});

var Award = db.model("Awards", Schema, "Awards");

module.exports = Award;
