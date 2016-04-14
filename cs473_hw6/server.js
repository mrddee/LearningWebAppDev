"use strict";

var redis = require("redis"),
    express = require("express"),
    bodyParser = require("body-parser"),
    http = require("http");

var client = redis.createClient();
var app = express();

app.use(bodyParser.json());

http.createServer(app).listen(8000);

app.post("/flip", function(req, res) {
    var coin, response, guess = req.body.call;
    var x = Math.floor((Math.random() * 10) + 1);

    console.log("The client guesses: " + guess);

    if (x > 5) {
        coin = "heads";
    } else {
        coin = "tails";
    }

    console.log("The flip result is: " + coin);

    if (guess === coin) {
        response = {
            "result": "win"
        };

        client.incr("wins");
    } else {

        response = {
            "result": "lose"
        };

        client.incr("losses");
    }

    res.json(response);
});

app.get("/stats", function(err, res) {
    var obj;
    console.log("The client is getting stats...");

    client.mget(["wins", "losses"], function(err, results) {
        if (err !== null) {
            console.log("ERROR: " + err);
            return;
        }

        obj = {
            "wins": parseInt(results[0], 10),
            "losses": parseInt(results[1], 10)
        };

        res.json(obj);
    });
});

app.delete("/stats", function(req, res) {

    console.log("The client is calling delete on stats...");

    client.set("wins", "0");
    client.set("losses", "0");

    res.send("Counts have been reset to 0");

});
