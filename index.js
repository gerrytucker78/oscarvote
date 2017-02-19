// index.js
var express = require("express");
var app = express();
var router = require("./router/ovoteRouter.js");
var candidateRouter = require("./router/candidateRouter.js");

app.set("view engine", "ejs");
app.set("views", "./views");


app.use("/", candidateRouter).use("/js", express.static('./js'));
//app.use("/", router).use("/js", express.static('./js'));

app.listen(3000);
