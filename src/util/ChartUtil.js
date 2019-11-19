import React from 'react'
import {SCORES_TO_CODES, ALL, NA, RESULTS, DEFAULT_ALL_HOLES_TAB, SCORES_TO_COLOURS, BIRDE, BOGEY} from '../constants/constants'
import {Cell} from 'recharts';
    
export const getScoresBarChartData = (courseData, currentHole) => {
    var chartData = []
    if(currentHole === ALL){
        for (var score in courseData.ParTotals) {
            if (!courseData.ParTotals.hasOwnProperty(score)) continue;

            var count = courseData.ParTotals[score][3] ? courseData.ParTotals[score][3] : 0
            count += courseData.ParTotals[score][4] ? courseData.ParTotals[score][4] : 0
            count += courseData.ParTotals[score][5] ? courseData.ParTotals[score][5] : 0

            chartData.push({
                'score' : score,
                'count' : count,
                'code'  : SCORES_TO_CODES[score]
            });
        }
    }else{
        var holeIndex = currentHole - 1
        for (var score in courseData.Holes[holeIndex]) {
            if (!courseData.Holes[holeIndex].hasOwnProperty(score) || !RESULTS.includes(score)) continue;

            var count = courseData.Holes[holeIndex][score]
            chartData.push({
                'score' : score,
                'count' : count,
                'code'  : SCORES_TO_CODES[score]
            });
        }
    }
    return chartData.sort(sortChartData);
}
    

export const getParTotalsBarChartData = (courseData) => {
    var chartData = []
    for (var score in courseData.ParTotals) {
        if (!courseData.ParTotals.hasOwnProperty(score) || score === NA) continue;
        chartData.push({
            'score' : score,
            'Par 3' : courseData.ParTotals[score][3] ? courseData.ParTotals[score][3] : 0,
            'Par 4' : courseData.ParTotals[score][4] ? courseData.ParTotals[score][4] : 0,
            'Par 5' : courseData.ParTotals[score][5] ? courseData.ParTotals[score][5] : 0,
            'code'  : SCORES_TO_CODES[score]
        });
    }
    return chartData.sort(sortChartData);
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
                        
                        chartData.data.push({
                            date : comp.Date,
                            gross : hole.Score
                        })
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

export const calculateDataMin = (dataMin) => {
    return dataMin < 0 ? dataMin - 5 : 0
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
    return <Cell fill={SCORES_TO_COLOURS[entry.score]} />;
} 
