"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var flip = require("./flip.js");

var app = express();


// used for parsing content type: application/json
app.use(bodyParser.json());

// express-powered HTTP server
http.createServer(app).listen(3000);


app.post("/flip", function(req, res) {

    console.log("Client guesses: " + req.body.call);
    var result = flip.coin(req.body.call);
    res.json(result);

});

app.get("/stats", function(req, res) {

    console.log("Server: the client is getting result stats");
    res.json(flip);

});
