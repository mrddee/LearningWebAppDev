"use strict";

// declare a variable to hold the result
var result = {
    "wins": 0,
    "losses": 0
};

result.coin = function flip(headsOrTail) {

    var coin, response;

    // generate pseudorandom number between 1 and 10
    var x = Math.floor((Math.random() * 10) + 1);

    if (x > 5) {
        coin = "heads";
    } else {
        coin = "tails";
    }

    if (headsOrTail === coin) {
        console.log("Server: correct guess");
        response = {
            "result": "win"
        };
        result.wins += 1;
    } else {
        console.log("Server: incorrect guess");
        response = {
            "result": "loss"
        };
        result.losses += 1;
    }

    return response;
};

module.exports = result;
