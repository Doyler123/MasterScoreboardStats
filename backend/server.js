const express = require('express');
const puppeteer = require('puppeteer');
const $ = require('cheerio');

const app = express();

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

const definite_results = [
  "Double",
  "Bogey",
  "Par",
  "Birde",
  "Eagle"
]

const FULL_ROW_LENGTH = 20;

const getHolePar = function(score, result){
  if(definite_results.includes(result)){
    return score - resultValues[result]
  }
  return null
}

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
          'Competitions' : [],
          'CourseInfo' : {
            'Holes' : []
          }
        }
        $('tr', table).each(function(rowIndex, row){
          if(rowIndex > 1){
            var compCells = $('td', row)
            if(compCells.length === FULL_ROW_LENGTH){
              var competition = {
                'Name'  : $(compCells[0]).text(),
                'Date'  : $(compCells[1]).text(),
                'NumHolesPlayed' : 0,
                'Holes' : []
              }
              $('td', row).each(function(cellIndex, cell){
                if(cellIndex > 1){
                  var resultColour = $(this).css('background-color');
                  if(resultColour && scoreMap[resultColour] !== "N/A"){
                    var result = scoreMap[resultColour] 
                    var holeNumber = cellIndex - 1;
                    var score = $(this).text();
                    competition.NumHolesPlayed += 1;
                    var hole = {
                      'Number' : holeNumber,
                      'Result' : result,
                      'Score'  : score
                    }
                    if(!course.CourseInfo.Holes[holeNumber]){
                      var par = getHolePar(score, result)
                      if(par){
                        var holeInfo = {
                          'Number' : holeNumber,
                          'Par'    : par
                        }
                        course.CourseInfo.Holes.push(holeInfo)
                      }
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

app.get("/scoreData", (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  getJsonData().then(function(data){
    res.json(data);
  });
 });

app.listen(3500, () => {
  console.log("Server running on port 3500");
 });

