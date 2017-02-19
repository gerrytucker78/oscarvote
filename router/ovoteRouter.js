var express = require("express");
var router = express.Router();
var Awards = require("../models/awards.js");

router.get("/", function(req, res){
  res.render("index", {})
})

router.get("/awards", function(req, res){
  Awards.find({}, function(err, awards){
    if(err) throw err;
    if(awards.length >= 1){
      // res.render("awards", {data: awards})
      res.send(awards);
    } else{
      res.render("awards", {data: "No awards added yet!"})
    }
  });
});

router.get("/awards/year/:year", function(req,res) {
  Awards.find({"year":req.params.year}, function(err, awards){
    if(err) throw err;
    if(awards.length >= 1){
      res.send(awards);
    } else{
      res.render("awards", {data: awards})
    }
  });
}); 


router.get("/awards/add/:name.:year", function(req, res){
  var newAward = new Awards({ name: req.params.name, year: req.params.year });
  newAward.save(function(err){
    if(err) throw err;
    res.redirect("/awards");
  });
});

module.exports = router;
