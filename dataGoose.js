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

articleSchema.query.duplicate = function (headline) {
  return this.where({ headline: headline });
};

var Article = mongoose.model("Article", articleSchema);

function newArticle(articleObj) {
  //Won't save article into database if its already there
  Article.find()
    .duplicate(articleObj.headline)
    .exec(function (err, articles) {
      if (!articles.length) {
        console.log("Saving new Article");
        var newArt = new Article(articleObj);
        newArt.save();
      }
    });
}

module.exports = newArticle;
