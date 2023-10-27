const cheerio = require("cheerio");
const fs = require("fs");
const axios = require("axios");
const pretty = require("pretty");

const URL =
  "https://lightnovelpub.vip/novel/the-authors-pov-1238/chapter-PlsChangeME";
var mainText = "";
var config = {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
  },
};
async function main(startChapter, endingChapter) {
  for (let i = startChapter; i <= endingChapter; i++) {

    let currentUrl = URL.replace("PlsChangeME", i)
    const { data } = await axios.get(currentUrl, config);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    console.log(pretty($.html()));


    mainText += "Chapter" + " " + i;

    let chapterContent =  $("#chapter-container").children('p');



    chapterContent.each(function (index, element) {
      // console.log($(element).text())
      mainText += $(element).text() + "\n\n";
      // console.log($(element).text() + "\n\n")

    });
    mainText = mainText.replace(/Read Latest Chapters at wuxiaworld.eu/g, "");
    console.log(mainText);
  }
  let fileName = startChapter + " - " + endingChapter + ".txt";
  fs.writeFile(fileName, mainText, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
}

main(851, 858);
