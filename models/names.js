// models/names.js
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/Names");

var Schema = mongoose.Schema({
  name: String
});

var Model = mongoose.model("Names", Schema);

module.exports = Model;
