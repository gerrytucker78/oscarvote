// models/awards.js
var db = require("mongoose");
db.Promise = global.Promise;
db.connect("mongodb://localhost/oscars");

module.exports = db;
