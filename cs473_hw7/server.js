"use strict";

var express = require("express"),
    bodyParser = require("body-parser"),
    http = require("http"),
    mongo = require("mongoose");

var app = express();

mongo.connect("mongodb://localhost");

var LinksSchema = mongo.Schema({
    title: String,
    link: String,
    clicks: Number
});

var MyLinks = mongo.model("myLinks", LinksSchema);

http.createServer(app).listen(8000);

app.use(bodyParser.json());

app.get("/links", function(req, res) {
    console.log("getting links");
    MyLinks.find({}, function(err, links) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR");
        } else {
            res.json(links);
        }
    });
});

app.post("/links", function(req, res) {

    console.log("posting links");

    console.log("the title is: " + req.body.title);
    console.log("the link is: " + req.body.link);

    var Obj = new MyLinks({
        "title": req.body.title,
        "link": req.body.link,
        "clicks": 0
    });

    Obj.save(function(err) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR");
        } else {
            MyLinks.find({}, function(err, result) {
                if (err !== null) {
                    res.send("ERROR");
                }
                res.json(result);
            });
        }
    });
});

app.get("/click/:title", function(req, res) {

    var site;
    console.log("clicking a link");

    // increment click count
    MyLinks.update({
            title: req.params.title
        }, {
            $inc: {
                clicks: 1
            }
        }, {
            upsert: true
        },
        function(err) {
            if (err !== null) {
                console.log(err);
                res.send("ERROR");
            } else {
                // find the object containing title and pull the link to redirect to
                MyLinks.findOne({
                        title: req.params.title
                    },
                    function(err, result) {
                        if (err) {
                            console.log("error: " + err);
                        }

                        // result is an JSON object matching the title
                        site = result.link;
                        console.log(site);

                        res.redirect(site);
                    });
            }
        });
});
