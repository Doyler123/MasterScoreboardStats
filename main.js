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

  const data = []

  await $('center', html).each(function(tableIndex, table) {
    // console.log($(this).prev().html());
    var course = {
      'Name' : $(this).prev().html(),
      'Competitions' : []
    }
    $('tr', table).each(function(rowIndex, row){
      if(rowIndex > 1){
        var compCells = $('td', row)
        if(compCells.length === 20){
          var competition = {
            'Name' : $(compCells[0]).text(),
            'Date' : $(compCells[1]).text()
          }
          $('td', row).each(function(cellIndex, cell){
            if(cellIndex > 1){
              var result = $(this).css('background-color');
              if(result){ 
                // console.log("Hole " + (cellIndex - 1) +":" + scoreMap[result]);
              }
            }
          })
          course.Competitions.push(competition);
        }
      }
    })
    data.push(course);
  });

  console.log(JSON.stringify(data, null, 2))

  browser.close();
}

printHtml();

