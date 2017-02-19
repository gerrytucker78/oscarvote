var express = require("express");
var router = express.Router();
var Candidates = require("../models/candidates.js");

router.get("/", function(req, res){
  res.render("index", {})
})

router.get("/candidates", function(req, res){
  Candidates.find({}, function(err, candidates){
    if(err) throw err;
    if(candidates.length >= 1){
      res.send(candidates);
    } else{
      res.send(candidates);
    }
  });
});

router.get("/candidates/years", function(req,res) {
  Candidates.distinct("year", function(err, candidates){
    if(err) throw err;
    if(candidates.length >= 1){
      res.send(candidates);
    } else{
      res.send(candidates);
    }
  });
}); 

router.get("/candidates/categories", function(req,res) {
  Candidates.distinct("category", function(err, candidates){
    if(err) throw err;
    if(candidates.length >= 1){
      res.send(candidates);
    } else{
      res.send(candidates);
    }
  });
}); 

router.get("/candidates/year/:year", function(req,res) {
  Candidates.find({"year":req.params.year}, function(err, candidates){
    if(err) throw err;
    if(candidates.length >= 1){
      res.send(candidates);
    } else{
      res.render("candidates", {data: candidates})
    }
  });
}); 

router.get("/candidates/year/category/:year.:category", function(req,res) {
  Candidates.find({"year":req.params.year,"category":req.params.category}, function(err, candidates){
    if(err) throw err;
    if(candidates.length >= 1){
      res.send(candidates);
    } else{
      res.render("candidates", {data: candidates})
    }
  });
}); 


router.get("/candidates/add/:year.:category.:name", function(req, res){
  var newCandidate = new Candidates({ category: req.params.category, name: req.params.name, year: req.params.year });
  newCandidate.save(function(err){
    if(err) throw err;
    res.redirect("/candidates");
  });
});

module.exports = router;
