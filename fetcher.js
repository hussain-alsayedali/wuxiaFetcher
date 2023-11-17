const cheerio = require("cheerio");
const fs = require("fs");
const axios = require("axios");
const pretty = require("pretty");

axios.defaults.headers.common["User-Agent"] =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3";

const URL =
  "https://www.readlightnovel.me/reincarnated-with-the-strongest-system-120922/chapter-PlsChangeME";
const BASEURL = "https://www.lightnovelcave.com";
var mainText = "";
var nextURL = "";

function getRandomNum() {
  let randomNum = 400 + Math.random() * 200;
  // console.log(randomNum)
}

async function main(startChapter, endingChapter) {
  for (let i = startChapter; i <= endingChapter; i++) {
    let currentUrl = URL.replace("PlsChangeME", +i);
    // console.log("CurrentURL"+currentUrl)
    await new Promise((r) => setTimeout(r, getRandomNum()));
    const { data } = await axios.get(currentUrl);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);

    const chapterTitle = $("div.desc h3");
    // console.log(chapterTitle.text())
    mainText += chapterTitle.text() + "\n" + "Chapter" + " " + i + "\n\n";

    let chapterContent = $("div.desc").children("p");

    // let nextButton = $("a.next.next-link")
    // nextURL = nextButton.attr('href')

    chapterContent.each(function (index, element) {
      mainText += $(element).text() + "\n\n";
    });
  }
  // cleaning

  mainText = mainText.replace(
    /If you find any errors \( broken links\, non\-standard content\, etc\.\. \)\, Please let us know  so we can fix it as soon as possible\./gi,
    ""
  );
  mainText = mainText.replace(
    /Tip\: You can use left\, right\, A and D keyboard keys to browse between chapters\./gi,
    ""
  );

  // cleaning

  let fileName = "RWTSS " + startChapter + " - " + endingChapter + ".txt";
  fs.writeFile(fileName, mainText, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
  mainText = "";
}
async function looper() {
  for (i = 5; i <= 10; i++) {
    console.log(`starting ${i * 100 + 1} - ${(i + 1) * 100}`);
    await new Promise((r) => setTimeout(r, 3000));
    await main(i * 100 + 1, (i + 1) * 100);
  }
}

main(801, 900);
