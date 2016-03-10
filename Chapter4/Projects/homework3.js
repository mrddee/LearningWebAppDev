var main = function() {
    "use strict";
    // function takes in an array of numbers as an argument and
    // calculates their average
    function exercise1(num) {
        var $arr_sum = 0;
        num.forEach(function(value) {
            $arr_sum = $arr_sum + value;
        });

        return $arr_sum / num.length;
    }

    // function accepts an array of numbers and returns the largest number
    function exercise2(num) {
        var large = 0;

        num.forEach(function(value) {
            if (value > large) {
                large = value;
            }
        });
        return large;
    }

    // Function that accepts an array of numbers and returns true if it contains
    // at least one even number and false if otherwise
    function exercise3(num) {
        var hasEven = false;

        num.forEach(function(value) {
            if (value % 2 === 0) {
                hasEven = true;
            }
        });
        return hasEven;
    }

    // Function that accepts and array of numbers and returns true if every number
    // is even, false otherwise
    function exercise4(num) {
        var allEven = true;

        num.forEach(function(value) {
            if (value % 2 === 1)
                allEven = false;
        });

        return allEven;
    }

    // Function that accepts two arguments, an array of strings, and a string.
    // Returns true if the string is contained in the array, false otherwise.
    function exercise5(arr, s) {
        var exists = false;

        arr.forEach(function(value) {
            if (value === s)
                exists = true;
        });

        return exists;
    }

    // Function that accepts two arguments, an array of strings, and a string.
    // Returns true only if the string is contained in the array AT LEAST TWICE,
    // false otherwise.
    function exercise6a(arr, s) {
        var count = 0;
        var exists = false;
        arr.forEach(function(value) {
            if (value === s)
                count = count + 1;
        });
        if (count >= 2)
            exists = true;
        return exists;
    }

    // Function that accepts three arguments, an array of strings, a string, and
    // an element n.Returns true only if the string is contained in the array
    // AT LEAST n TIMES, false otherwise.
    function exercise6b(arr, s, n) {
        var count = 0;
        var exists = false;
        arr.forEach(function(value) {
            if (value === s)
                count = count + 1;
        });
        if (count >= n)
            exists = true;
        return exists;
    }

    // variables for function calls
    var a = [1, 2, 3, 4, 5, 10, 20, 50, 100];
    var a_even = [2, 4, 6, 8, 10];
    var b = ["a", "b", "c", "d"];
    var c = ["a", "b", "c", "c", "c", "d"];
    var d = ["a", "a", "a", "b"];

    $(".ex1").append(exercise1(a)); // return average
    $(".ex2").append(exercise2(a)); // return max
    $(".ex3").append(exercise3(a_even)); // array has at least 1 even number?
    $(".ex4").append(exercise4(a_even)); // array is all odd numbers?
    $(".ex5").append(exercise5(b, "b")); // array contains a string s
    $(".ex6a").append(exercise6a(c, "c")); // array contains a string s >= 2 times
    $(".ex6b").append(exercise6b(d, "a", 3)); // array contains a string s >= n times

    // Using underscore.js for exercises 2,3,4
    var hasEven = _.some(a_even, function(num) {
        return num % 2 === 0;
    });
    var allEven = _.every(a_even, function(num) {
        return num % 2 === 0;
    });

    $(".max").append(_.max(a));
    $(".one-even").append(hasEven);
    $(".all-even").append(allEven);
};

$(document).ready(main);
