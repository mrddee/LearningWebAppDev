function addActor() {
  "use strict";

  var newName = document.forms["submit_form"]["actor_name"].value;

  // alternative way to POST
  //$.post("http://localhost:3000/actors", { id: "" , name: newName, starred: "false"});

  // ajax method to POST
  $.ajax({
          type: "POST",
          url: "http://localhost:3000/actors",
          data: { id: "", name: newName, starred: "false" },
          success: function(){
            location.reload();
          }
  });
};

// TODO
// function changeStar() {
//   "use strict";
//   $("mdl-list__item-secondary-action").onClick(function(){
//
//
//     $.ajax({
//             type: "PUT",
//             url: "http://localhost:3000/actors",
//             data: { starred: "true" }
//             success: function(){
//               location.reload();
//             }
//   });
//
// });
//
// }
