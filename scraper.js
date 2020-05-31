var cheerio = require("cheerio");

var axios = require("axios");

var createArticle = require("./dataGoose");
console.log(
  "***************************************\n" +
    "Grabbing Data\n" +
    "***************************************\n"
);

// Need to request the page via axios
axios
  .get("https://www.entrepreneur.com/topic/coding")
  .then(function (response) {
    let $ = cheerio.load(response.data);

    let results = [];

    $(".pl").each(function (index, element) {
      console.group(index);

      //Grabbing the headline
      console.log($(element).find("h3 a").text());

      //Grabbing the article Link, which is relative to the root url
      //In this case it will be $BASE_URL/article/######
      console.log($(element).find("a").attr("href"));

      //Grabbign the short summary of the article
      console.log($(element).find(".deck").text());

      // For the images will need to remove the "&blur=50" attribute from the string
      console.log($(element).find("img").attr("src").replace("&blur=50", ""));

      let aObj = {
        headline: $(element).find("h3 a").text(),
        link: $(element).find("a").attr("href"),
        summary: $(element).find(".deck").text(),
        image: $(element).find("img").attr("src").replace("&blur=50", "")
      };
      createArticle(aObj);
      console.groupEnd();
    });
  });
