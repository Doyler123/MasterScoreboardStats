import {SCORES_TO_CODES, RESULT_VALUES, ALL, NA, RESULTS} from '../constants/constants'

export default class ChartDataCalculator{
    
    getScoresBarChartData = (courseData, currentHole) => {
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
        return chartData.sort(this.sortChartData);
    }
    

    getParTotalsBarChartData = (courseData) => {
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
        return chartData.sort(this.sortChartData);
    }


    getGrossLineChartData = (courseData, currentHole) => {
        var chartData = {
            'data' : [],
            'average' : 0
        }
        if(!this.isEmpty(courseData)){
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

    sortChartData = (a, b) =>{
        if (a.code < b.code)
            return -1;
        if (a.code > b.code)
            return 1;
        return 0;
    }

    isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }
}