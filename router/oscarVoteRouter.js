var express = require("express");
var router = express.Router();
var Candidates = require("../models/candidates.js");
var Votes = require("../models/votes.js");

/**********************
* Default Index
***********************/

router.get("/", function(req, res){
  res.render("index", {})
});

/**********************
* Voting Backend Services
***********************/

// *** Retrieve All votes : JSON Format Only
router.get("/votes", function(req, res){
  Votes.find({}, function(err, candidates){
    if(err) throw err;
    if(candidates.length >= 1){
      res.send(candidates);
    } else{
      res.send(candidates);
    }
  });
});

// *** Retrieve All votes : JSON Format Only
router.get("/votes/year/category/:year.:category", function(req, res){
  Votes.aggregate([{$match:{"year":parseInt(req.params.year),"category":req.params.category}},{$group: {"_id":"$name", "votes": {$sum:1}}},{$sort: {"votes":-1}}], function(err, votes){
    if(err) throw err;
    res.send(votes);
  });
});

// *** Add a vote: JSON Format Only
router.get("/votes/add/:year.:category.:name", function(req, res){
  Votes.find({"year": req.params.year, "category": req.params.category, "voter": req.ip}, function(err, vote){
    if(err) throw err;
    if(vote.length >= 2000){
      // ERROR: Cannot cast more than one vote!
      res.send("ERROR: " + req.ip + " already casted a vote for " + req.params.year + " " + req.params.category + " - " + vote[0].name);
    } else{
      var newVote= new Votes({ category: req.params.category, name: req.params.name, year: req.params.year, voter: req.ip });
      newVote.save(function(err){
        if(err) throw err;
        res.send("Success: Vote cast for " + req.params.year + " " + req.params.category + " - " + req.params.name);
      });
    }
  });
});

// *** Delete All votes: JSON Format Only
router.get("/votes/reset", function(req,res) {
  Votes.find({}, function(err, votes){
    if(err) throw err;

    for (i = 0; i < votes.length; i++) {
      var voteDel = votes[i];
      voteDel.remove();
    }

    res.redirect("/votes");
  });
}); 


/**********************
* Candidate Backend Services
***********************/

// *** Retrieve All candidates: JSON Format Only
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

// *** Retrieve All unique years: JSON Format Only
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

// *** Retrieve All unique categories: JSON Format Only
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

// *** Delete All candidates: JSON Format Only
router.get("/candidates/reset", function(req,res) {
  Candidates.find({}, function(err, candidates){
    if(err) throw err;

    for (i = 0; i < candidates.length; i++) {
      var canDel = candidates[i];
      canDel.remove();
    }

    res.redirect("/candidates");
  });
}); 


// *** Retrieve candidates associated with provided year: JSON Format Only
router.get("/candidates/year/:year", function(req,res) {
  Candidates.find({"year":req.params.year}, function(err, candidates){
    if(err) throw err;
    res.send(candidates);
  });
}); 

// *** Retrieve candidates associated with provided year and category: JSON Format Only
router.get("/candidates/year/category/:year.:category", function(req,res) {
  Candidates.find({"year":req.params.year,"category":req.params.category}, function(err, candidates){
    if(err) throw err;
    res.send(candidates);
  });
}); 


// *** Add candidates with provided year and category and name: JSON Format Only
router.get("/candidates/add/:year.:category.:name", function(req, res){
  var newCandidate = new Candidates({ category: req.params.category, name: req.params.name, year: req.params.year });
  newCandidate.save(function(err){
    if(err) throw err;
    res.redirect("/candidates");
  });
});

module.exports = router;
