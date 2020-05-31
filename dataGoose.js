const mongoose = require("mongoose");

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

var articleSchema = new mongoose.Schema({
  headline: String,
  link: String,
  image: String,
  summary: String
});

var Article = mongoose.model("Article", articleSchema);

// var newArticle = new Article({
//   headline: "Microsoft to Acquire GitHub for $7.5 Billion",
//   link: "/article/314449",
//   summary:
//     "The web-based project hosting service attracts millions of developers and open source projects.",
//   image:
//     "https://assets.entrepreneur.com/content/3x2/2000/20180604144653-microsoft-github.jpeg?format=jpg&width=300&crop=4:3"
// });

// Need to save the new instance of the model for it to be populated in the database

function newArticle(articleObj) {
  var newArt = new Article(articleObj);
  newArt.save();
}

module.exports = newArticle;
