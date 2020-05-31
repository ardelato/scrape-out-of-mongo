var cheerio = require("cheerio");

var axios = require("axios");

var createArticle = require("./dataGoose");
console.log(
  "***************************************\n" +
    "Grabbing Data\n" +
    "***************************************\n"
);

function scrape() {
  // Need to request the page via axios
  const baseURL = "https://www.entrepreneur.com";
  return axios.get(`${baseURL}/topic/coding`).then(function (response) {
    let $ = cheerio.load(response.data);

    let results = [];

    $(".pl").each(function (index, element) {
      let aObj = {
        headline: $(element).find("h3 a").text(),
        link: baseURL + $(element).find("a").attr("href"),
        summary: $(element).find(".deck").text(),
        image: $(element).find("img").attr("src").replace("&blur=50", "")
      };

      // Pass article object that will be destructured
      createArticle(aObj);
      results.push(aObj);
      //   console.groupEnd();
    });
    return results;
  });
}

module.exports = scrape;
