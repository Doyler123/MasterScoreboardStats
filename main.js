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

const resultValues = {
  "Scratch" : 2,
  "Triple"  : 3,
  "Double"  : 2,
  "Bogey"   : 1,
  "Par"     : 0,
  "Birde"   : -1,
  "Eagle"   : -2,
  "N/A"     : 0
}

const FULL_ROW_LENGTH = 20;

const getJsonData = async function(){
  const browser = await puppeteer.launch();
  try{

    const page = await browser.newPage();
    await page.goto(url);
    
    await page.type('#ms_password', 'lgc');
        
    await Promise.all([
      page.waitForNavigation(),
      page.click('.log_in_button')
    ]);
    
    const html = await page.content();

    const data = []

    await $('center', html).each(function(tableIndex, table) {
      if($(this).prev().is('h3')){ 
        var course = {
          'Name' : $(this).prev().html(),
          'Competitions' : []
        }
        $('tr', table).each(function(rowIndex, row){
          if(rowIndex > 1){
            var compCells = $('td', row)
            if(compCells.length === FULL_ROW_LENGTH){
              var competition = {
                'Name'  : $(compCells[0]).text(),
                'Date'  : $(compCells[1]).text(),
                'Holes' : []
              }
              $('td', row).each(function(cellIndex, cell){
                if(cellIndex > 1){
                  var result = $(this).css('background-color');
                  if(result){ 
                    var holeNumber = cellIndex - 1
                    var hole = {
                      'Number' : holeNumber,
                      'Result' : scoreMap[result],
                      'Score'  : $(this).text()
                    }
                    competition.Holes.push(hole);
                  }
                }
              })
              course.Competitions.push(competition);
            }
          }
        })
        data.push(course);
      }
    });

    return data;

  }catch(error){
    console.log(error);
    await browser.close();
  }finally{
    await browser.close();
  }

}

getJsonData().then(function(data){
  console.log(JSON.stringify(data, null, 2))
});

