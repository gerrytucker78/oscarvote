var db = require("./db.js");

var voteSchema = db.Schema({
  voter: String,
  name: String,
  category: String,
  year: Number
});

var Votes = db.model("Votes", voteSchema, "Votes");

module.exports = Votes;
