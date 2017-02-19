// index.js
'strict use';
var express = require("express");
var app = express();
var oscarVoteRouter = require("./router/oscarVoteRouter.js");
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/favico.ico'));


app.set("view engine", "ejs");
app.set("views", "./views");


app.use("/", oscarVoteRouter).use("/js", express.static('./js')).use("/css", express.static('./css'));

app.listen(3000);
