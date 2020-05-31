$(document).ready(function () {
  console.log("READY!!");
  $("button").on("click", function () {
    $("#comment").modal("show");
  });
});
