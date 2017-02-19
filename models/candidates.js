var db = require("./db.js");

var candidateSchema = db.Schema({
  name: String,
  category: String,
  year: Number
});

var Candidate = db.model("Candidates", candidateSchema, "Candidates");

module.exports = Candidate;
