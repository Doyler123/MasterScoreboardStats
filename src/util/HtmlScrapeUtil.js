import moment from 'moment';

import { getHoleResult, getScoreValue } from './CourseDataUtil'
import { RESULT_VALUES, MS_DATE_FORMAT, HDID_DATE_FORMAT } from '../constants/constants'
import hdid2 from '../staticdata/howdididi2';
const $ = require('cheerio');

export const parseHowDidIDoHtml = (hdidData) => {

    let compNameData = {};

    $('tr[data-row-filter="My Results"]', hdid2.html).each((resultIndex, resultElm) => {
        let name;
        $('td', resultElm).each((tdIndex, tdElm) => {
            $('a[data-toggle="tooltip"]', tdElm).each((aIndex, aElm) => {
                if(aElm.children[0]){
                    name = aElm.children[0].data 
                }
            })
            
            if(tdElm.children[0]){
                let rowContent = tdElm.children[0].data
                if(rowContent){
                    let date = moment(rowContent, HDID_DATE_FORMAT) 
                    if(date.isValid()){
                        compNameData[date.format(MS_DATE_FORMAT)] = {
                            date: date.format(MS_DATE_FORMAT),
                            name: name
                        }
                    }
                }
            }
        })
    })

    const data = {};

    $('li.scorecard', hdidData.html).each( (roundElmIndex, roundElm) => {

        let courseName = roundElm.attribs['data-row-filter'];

        if(!data.hasOwnProperty(courseName)){
            data[courseName] = {
                courseId: "",
                Name: courseName,
                Competitions: [],
                CourseInfo: {
                    Holes: [

                    ]
                }
            }
        }

        let comp = {
            Name: `howDidIDo comp${roundElmIndex}`,
            NumHolesPlayed: 0,
            Holes: [],
            Gross: 0
        }

        // console.log(roundElm.attribs['data-row-filter'])
        $('li>a', roundElm).each((dateIndex, dateElm) => {
            if(dateElm.children[0]){
                let date = moment(dateElm.children[0].data, HDID_DATE_FORMAT).format(MS_DATE_FORMAT)
                comp['Date'] = date;
            }
        })

        if(compNameData[comp.Date]){
            comp.Name = compNameData[comp.Date].name
        }else{
            console.log(`could not find comp for date ${comp.date}`)
        }

        $('li.badge', roundElm).each(( holeIndex, holeElm) => {
            let par = holeElm.attribs['data-hole-par']
            if(par && par !== "0"){
                comp.NumHolesPlayed += 1;
                let score = holeElm.children[0].data === "0" ? "NR" : holeElm.children[0].data;
                
                let hole = {
                    Number: holeIndex + 1,
                    Result: getHoleResult(score, par),
                    Score: score
                }
    
                comp.Holes.push(hole)
    
                let scoreValue = RESULT_VALUES[hole.Result]
                if(!isNaN(scoreValue)){
                    comp.Gross += scoreValue;
                } 
    
                if(!data[courseName].CourseInfo.Holes.find( h => h.Number === (holeIndex + 1) )){
                    data[courseName].CourseInfo.Holes.push({
                        Number: (holeIndex + 1),
                        Par: par
                    })
                }
            }

        })

        let courseId = "";
        data[courseName].CourseInfo.Holes.forEach(hole => {
            courseId = courseId + `${hole.Par}`
        });
        data[courseName].courseId = courseId;
        data[courseName].Competitions.push(comp);
    })

    
    let courses = Object.values(data);
    let alraedyProcessed = [];
    let combinedCourses = [];
    courses.forEach(course => {
        if(!alraedyProcessed.includes(course.courseId)){
            let matchingCourses = courses.filter(c => c.courseId === course.courseId);
            let mostPlayed = matchingCourses.sort((a, b) => b.Competitions.length - a.Competitions.length)[0]
            matchingCourses.forEach(matchingCourse => {
                mostPlayed.Competitions.concat(matchingCourse.Competitions)
            })
            combinedCourses.push(mostPlayed);
            alraedyProcessed.push(course.courseId);
        }
        
    })
    
    console.log(JSON.stringify(combinedCourses, null, 2))
    return combinedCourses;
}