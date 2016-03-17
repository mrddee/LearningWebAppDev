var main = function() {
    "use strict";

    $.get("http://localhost:3000/db", function(db) {
        db.actors.forEach(function(value) {

            var starIcon = "star";
            if (value.starred === false)
                starIcon = "star_border";

            $(".demo-list-action").append(
                "<div class='mdl-list__item'>" +
                "<span class='mdl-list__item-primary-content'>" +
                "<i class='material-icons mdl-list__item-avatar'>person</i>" +
                "<span>" + value.name + "</span>" +
                "</span>" +
                "<a class='mdl-list__item-secondary-action' href='#'>" +
                "<i class='material-icons'>" +
                starIcon + "</i></a>" +
                "</div>");
        });
    });
};

$(document).ready(main);
