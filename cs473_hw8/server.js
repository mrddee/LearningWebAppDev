"use strict";

var express = require("express"),
    app = express(),
    http = require("http").Server(app),
    // import the mongoose library
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    io = require("socket.io")(http);

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.urlencoded({ extended:true }));

// connect to the amazeriffic data store in mongo
mongoose.connect("mongodb://localhost/amazeriffic");

// This is our mongoose model for todos
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

http.listen(3000, function() {
    console.log("Server is now listening on port 3000");
});

app.get("/todos.json", function (req, res) {
    ToDo.find({}, function (err, toDos) {
	res.json(toDos);
    });
});

app.post("/todos", function (req, res) {
    console.log(req.body);
    var newToDo = new ToDo({"description":req.body.description, "tags":req.body.tags});
    newToDo.save(function (err) {
	if (err !== null) {
	    // the element did not get saved!
	    console.log(err);
	    res.send("ERROR");
	} else {
	    // our client expects *all* of the todo items to be returned, so we'll do
	    // an additional request to maintain compatibility
	    ToDo.find({}, function (err, result) {
		if (err !== null) {
		    // the element did not get saved!
		    res.send("ERROR");
		}
		res.json(result);
	    });
	}
    });
});

io.on("connection", function(socket) {
    console.log("a user connected");

    socket.on("disconnect", function() {
        console.log("a user disconnected");
    });

    socket.on("newtodo", function() {
        console.log("a user posted a new item");
        io.emit("newtodo");
    });
});
