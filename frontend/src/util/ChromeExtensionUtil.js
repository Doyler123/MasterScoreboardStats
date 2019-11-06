const $ = require('cheerio');

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
    return 4
  }
  
  const sortHoles = function(a, b){
    if(a.Number > b.Number){
      return 1
    }
    if(a.Number < b.Number){
      return -1
    }
    return 0
  }
  
  export const parseData = function(html){  
      const data = []
  

    $('center', html).each(function(tableIndex, table) {
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
                var holeNumber = 1;
                $('td', row).each(function(cellIndex, cell){
                  if(cellIndex > 1){
                    var resultColour = $(this).css('background-color');
                    if(resultColour && scoreMap[resultColour] !== "N/A"){
                      var result = scoreMap[resultColour] 
                      var score = $(this).text();
                      competition.NumHolesPlayed += 1;
                      var hole = {
                        'Number' : holeNumber,
                        'Result' : result,
                        'Score'  : score
                      }
                      if(!course.CourseInfo.Holes.filter(h => h.Number === holeNumber).length > 0){
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
                      holeNumber +=1
                    }
                  }
                })
                course.Competitions.push(competition);
              }
            }
          })
          course.CourseInfo.Holes.sort(sortHoles);
          data.push(course);
        }
      });
  
      return data;
  
  }
  