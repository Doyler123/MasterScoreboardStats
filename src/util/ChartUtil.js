import React from 'react'
import {SCORES_TO_CODES, ALL, NA, RESULTS, DEFAULT_ALL_HOLES_TAB, SCORES_TO_COLOURS, BIRDE, BOGEY} from '../constants/constants'
import {Cell} from 'recharts';
    
export const getScoresBarChartData = (courseData, currentHole) => {

    var chartData = {}
    courseData.forEach(course => {
        if(currentHole === ALL){
            for (var score in course.ParTotals) {
                if (!course.ParTotals.hasOwnProperty(score)) continue;
    
                let count = course.ParTotals[score][3] ? course.ParTotals[score][3] : 0
                count += course.ParTotals[score][4] ? course.ParTotals[score][4] : 0
                count += course.ParTotals[score][5] ? course.ParTotals[score][5] : 0
    
                if (!chartData.hasOwnProperty(score)){
                    chartData[score] = {
                        'score' : score,
                        'count' : count,
                        'code'  : SCORES_TO_CODES[score]
                    }
                }else{
                    chartData[score].count += count;
                }
            }
        }else{
            var holeIndex = currentHole - 1
            for (let score in course.Holes[holeIndex]) {
                if (!course.Holes[holeIndex].hasOwnProperty(score) || !RESULTS.includes(score)) continue;
    
                let count = course.Holes[holeIndex][score]
                
                if (!chartData.hasOwnProperty(score)){
                    chartData[score] = {
                        'score' : score,
                        'count' : count,
                        'code'  : SCORES_TO_CODES[score]
                    }
                }else{
                    chartData[score].count += count;
                }
            }
        }
    })
    return Object.values(chartData).sort(sortChartData);
}
    

export const getParTotalsBarChartData = (courseData) => {
    var chartData = []
    courseData.forEach(course => {
        for (var score in course.ParTotals) {
            if (!course.ParTotals.hasOwnProperty(score) || score === NA) continue;

            if (!chartData.hasOwnProperty(score)){
                chartData[score] = {
                    'score' : score,
                    'Par 3' : course.ParTotals[score][3] ? course.ParTotals[score][3] : 0,
                    'Par 4' : course.ParTotals[score][4] ? course.ParTotals[score][4] : 0,
                    'Par 5' : course.ParTotals[score][5] ? course.ParTotals[score][5] : 0,
                    'code'  : SCORES_TO_CODES[score]
                };
            }else{
                chartData[score]['Par 3'] += course.ParTotals[score][3] ? course.ParTotals[score][3] : 0;
                chartData[score]['Par 4'] += course.ParTotals[score][4] ? course.ParTotals[score][4] : 0;
                chartData[score]['Par 5'] += course.ParTotals[score][5] ? course.ParTotals[score][5] : 0;
            }
        }
    })
    return Object.values(chartData).sort(sortChartData);
}


export const getGrossLineChartData = (courseData, currentHole) => {
    var chartData = {
        'data' : [],
        'average' : 0
    }
    if(!isEmpty(courseData)){
        chartData.average = courseData.AverageScore
        courseData.Competitions.forEach((comp, index) => {
            
            if(currentHole === ALL){
                chartData.data.push({
                    date : comp.Date,
                    gross : comp.Gross
                })

            }else{
                comp.Holes.forEach((hole, index) => {
                    if(currentHole === hole.Number){
                        chartData.average = courseData.Holes[index].TotalStrokes / courseData.Competitions.length
                        if(!isNaN(hole.Score)){
                            chartData.data.push({
                                date : comp.Date,
                                gross : parseInt(hole.Score)
                            })
                        }
                    }
                })
            }
        })
    }
    chartData.data.reverse()
    return chartData
}

export const sortChartData = (a, b) =>{
    if (a.code < b.code)
        return -1;
    if (a.code > b.code)
        return 1;
    return 0;
}

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}


export const getAllHolesBarChartData = (data, dataField) =>{
    var chartData = []
    if(data.Holes){
        data.Holes.forEach((hole, index) => {
            chartData.push({
                "hole" : "Hole " + (index + 1),
                "total" : hole[dataField] ? hole[dataField] : 0
            })
        });
    }
    return chartData
}

export const getBarColour = (entry, tab) => {
    if(tab === DEFAULT_ALL_HOLES_TAB){
        if(entry.total < 0){
            return SCORES_TO_COLOURS[BIRDE]
        }
        return SCORES_TO_COLOURS[BOGEY]
    }
    return SCORES_TO_COLOURS[tab]
}

export const fillBar = (entry) => {
    return <Cell key={SCORES_TO_COLOURS[entry.score] } fill={SCORES_TO_COLOURS[entry.score]} />;
} 

export const getDataMax = dataMax => Math.max(30, Math.round(dataMax + (dataMax / 10)))

export const getDataMin = dataMin =>  dataMin < 0 ? Math.min(dataMin - 5, Math.round(dataMin + (dataMin / 10))) : 0