"use strict"

/*global require*/

var express = require("express");
var ejs = require("ejs");
var urlEncodedBodyParser = require("body-parser").urlencoded({extended: false});
var app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(urlEncodedBodyParser);
        

app.listen(3000, "localhost", function() {
    console.log("I'm listening");
});

app.get("/", function(req, res) {
    console.log(req.route.stack[0].method + ": " + req.route.path);
    res.render("index.html.ejs");
});
