const scraper = require("../scraper.js");

module.exports = function (app) {
  app.get("/", function (req, res) {
    scraper().then(function (results) {
      //   console.log(results);
      res.render("index", { article: results });
    });
  });
};
