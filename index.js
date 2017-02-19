// index.js
var express = require("express");
var app = express();
var oscarVoteRouter = require("./router/oscarVoteRouter.js");

app.set("view engine", "ejs");
app.set("views", "./views");


app.use("/", oscarVoteRouter).use("/js", express.static('./js'));

app.listen(3000);
