const cheerio = require("cheerio");
const fs = require("fs");
const axios = require("axios");
const pretty = require("pretty");

axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'

const URL =
  "https://www.readlightnovel.me/reincarnated-with-the-strongest-system-120922/chapter-PlsChangeME";
const BASEURL = 
  "https://www.lightnovelcave.com"
var mainText = "";
var nextURL = ""

function  getRandomNum(){
  let randomNum =  400 + Math.random() * 200
  // console.log(randomNum) 
}

async function main(startChapter, endingChapter) {
  for (let i = startChapter; i <= endingChapter; i++) {


    let currentUrl =  URL.replace("PlsChangeME", +i)
    // console.log("CurrentURL"+currentUrl)
    await new Promise(r => setTimeout(r, getRandomNum()));
    const { data } = await axios.get(currentUrl);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    let chapterTitle = $("#div.desc br")
    mainText += chapterTitle.text() + "\n"+  "Chapter" + " " + i +"\n\n";
    
    console.log(chapterTitle.text())
    let chapterContent =  $("div.desc").children('p');

    let nextButton = $("a.next.next-link")
    nextURL = nextButton.attr('href')
    // console.log("next URl"+nextURL)

    chapterContent.each(function (index, element) {
      // console.log($(element).text())
      mainText += $(element).text() + "\n\n";
      // console.log($(element).text() + "\n\n")

    });

    //console.log(mainText);
  }
  mainText = mainText.replace(/New novel chapters are published on lightnovelpub\[\.\]com/ig, "");
  mainText = mainText.replace(/Visit lightnovelpub\[\.\]com for a better experience/g, "");
  mainText = mainText.replace(/Updated from lightnovelpub\[\.\]com/g, "");
  mainText = mainText.replace(/Follow current novels on lightnovelpub\[\.\]com/g, "");
  mainText = mainText.replace(/The most up-to-date novels are published on lightnovelpub\[\.\]com/g, "");
  mainText = mainText.replace(/The source of this content is lightnovelpub\[\.\]com/g, "");
  mainText = mainText.replace(/This content is taken from lightnovelpub\[\.\]com/g, "");
  mainText = mainText.replace(/This content is taken from lightnovelpub\[\.\]com/g, "");
  let fileName = startChapter + " - " + endingChapter + ".txt";
  fs.writeFile(fileName, mainText, function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
}
async function looper(){
  for(i = 1 ; i <= 10 ; i++ ){
    console.log(`starting ${i * 10 * 1} - ${i *10 + 10}`)
    await new Promise(r => setTimeout(r, 3000))
    await main(i * 10 * 1, i *10 + 10);
  }
}

main(11,50)