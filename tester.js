
const cheerio = require("cheerio");
const fs = require("fs");
const axios = require("axios");
const pretty = require("pretty");

async function main(){
    try{
        const { moew } = await axios.get("https://lightnovelpub.vip/novel/the-authors-pov-1238/chapter-851");
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(moew);
        console.log(pretty($.html()));
    }
    catch(err){
        console.log(err)
    }

}

// main()

async function tester(){
    const config = {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
        },
      };
    const response = await fetch("https://lightnovelpub.vip/novel/the-authors-pov-1238/chapter-851" , config);
    const body = await response.text();
    await new Promise(r => setTimeout(r, 500));
    console.log(body)
}
function  getRandomNum(){
    let randomNum =  400 + Math.random() * 200
    console.log(randomNum) 
}
for(i = 1 ; i < 40 ; i ++){
    getRandomNum()
}