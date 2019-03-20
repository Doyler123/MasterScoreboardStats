const puppeteer = require('puppeteer');
const $ = require('cheerio');

const url = 'https://www.masterscoreboard.co.uk/results/PlayerScores.php?CWID=24259&Player=307';

const scoreMap = {
  "#D0D0D0" : "Scratch",
  "#6E6E6E" : "Triple",
  "#0033CC" : "Double",
  "#008AD8" : "Bogey",
  "#CC9900" : "Par",
  "#CC0033" : "Birde",
  "#F25F5F" : "Eagle",
  "white"   : "N/A"
}

const printHtml = async function(){
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(url);
  
  await page.type('#ms_password', 'lgc');
  
  await page.click('.log_in_button');
  
  await page.waitForNavigation();
  
  const html = await page.content();

  await $('center', html).each(function(tableIndex, table) {
    console.log($(this).prev().html());
    $('tr', table).each(function(rowIndex, row){
      // console.log($.html(this));
      $('td', row).each(function(cellIndex, cell){
        if(cellIndex > 1){
          var result = $(this).css('background-color');
          if(result){ 
            console.log("Hole " + (cellIndex - 1) +":" + scoreMap[result]);
          }
        }
      })
    })
  });

  browser.close();
}

printHtml();

