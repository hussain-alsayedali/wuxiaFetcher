const cheerio = require("cheerio");
const fs = require("fs");

const URL =
  "https://www.wuxiaworld.eu/chapter/reincarnation-of-the-strongest-sword-god-PlsChangeME";
var mainText = "";

async function main(startChapter, endingChapter) {
  for (let i = startChapter; i <= endingChapter; i++) {
    const response = await fetch(URL.replace("PlsChangeME", i));
    const body = await response.text();
    const $ = cheerio.load(body);

    mainText += "Chapter" + " " + i;
    $("#chapterText").each(function (index, element) {
      mainText += $(element).text() + "\n\n";
    });
    mainText = mainText.replace(/Read Latest Chapters at wuxiaworld.eu/g, "");
    console.log(i);
  }
  let fileName = startChapter + " - " + endingChapter + ".txt";
  fs.writeFile(fileName, mainText, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
}

main(1999, 2500);
