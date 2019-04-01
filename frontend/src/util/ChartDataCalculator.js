import {SCORES_TO_CODES, RESULT_VALUES, ALL, NA, RESULTS} from '../constants/constants'

export default class ChartDataCalculator{

    _courseData = {}

    constructor(course){
        if(course){
            this._courseData = this.calculateCourseData(course);
        }
    }

    getCourseData = () => {
        return this._courseData
    }
    
    calculateCourseData = (course) => {

        var courseData = {
            'AverageScore'  : 0,
            'Competitions'  : course.Competitions,
            'Holes'         : [],
            'ParTotals'     : {}
        }

        if(course){
            course.Competitions.forEach((comp, compIndex) => {

                courseData.Competitions[compIndex]['Gross'] = 0
                
                comp.Holes.forEach((hole, holeIndex) =>{

                    courseData.Competitions[compIndex].Gross += RESULT_VALUES[hole.Result];
                    var par = course.CourseInfo.Holes[holeIndex].Par
                    
                    if(!courseData.Holes[holeIndex]){
                        courseData.Holes.push({
                            "HolePar"       : par,
                            [hole.Result]   : 1,
                            'TotalStrokes'  : this.getScoreValue(hole.Score, par, hole.Result),
                            'TotalToPar'    : RESULT_VALUES[hole.Result]
                        })
                    }else{

                        if(hole.Result in courseData.Holes[holeIndex]){
                            courseData.Holes[holeIndex][hole.Result] += 1
                        }else{
                            courseData.Holes[holeIndex][hole.Result] = 1
                        }
                        courseData.Holes[holeIndex].TotalStrokes  += this.getScoreValue(hole.Score, par, hole.Result)
                        courseData.Holes[holeIndex].TotalToPar    += RESULT_VALUES[hole.Result]
                    }

                    if(hole.Result in courseData.ParTotals){
                        if(par in courseData.ParTotals[hole.Result]){
                            courseData.ParTotals[hole.Result][par] += 1
                        }else{
                            courseData.ParTotals[hole.Result][par] = 1
                        }
                    }else{
                        courseData.ParTotals[hole.Result]= {[par]: 1}
                    }
                    
                })

                courseData.AverageScore += courseData.Competitions[compIndex].Gross
            });

            courseData.AverageScore = courseData.AverageScore/courseData.Competitions.length
        }
        console.log(courseData)
        return courseData
    }

    getScoresBarChartData = (currentHole) => {
        var chartData = []
        if(currentHole === ALL){
            for (var score in this._courseData.ParTotals) {
                if (!this._courseData.ParTotals.hasOwnProperty(score)) continue;

                var count = this._courseData.ParTotals[score][3] ? this._courseData.ParTotals[score][3] : 0
                count += this._courseData.ParTotals[score][4] ? this._courseData.ParTotals[score][4] : 0
                count += this._courseData.ParTotals[score][5] ? this._courseData.ParTotals[score][5] : 0

                chartData.push({
                    'score' : score,
                    'count' : count,
                    'code'  : SCORES_TO_CODES[score]
                });
            }
        }else{
            var holeIndex = currentHole - 1
            for (var score in this._courseData.Holes[holeIndex]) {
                if (!this._courseData.Holes[holeIndex].hasOwnProperty(score) || !RESULTS.includes(score)) continue;

                var count = this._courseData.Holes[holeIndex][score]
                chartData.push({
                    'score' : score,
                    'count' : count,
                    'code'  : SCORES_TO_CODES[score]
                });
            }
        }
        return chartData.sort(this.sortChartData);
    }
    

    getParTotalsBarChartData = () => {
        var chartData = []
        for (var score in this._courseData.ParTotals) {
            if (!this._courseData.ParTotals.hasOwnProperty(score) || score === NA) continue;
            chartData.push({
                'score' : score,
                'Par 3' : this._courseData.ParTotals[score][3] ? this._courseData.ParTotals[score][3] : 0,
                'Par 4' : this._courseData.ParTotals[score][4] ? this._courseData.ParTotals[score][4] : 0,
                'Par 5' : this._courseData.ParTotals[score][5] ? this._courseData.ParTotals[score][5] : 0,
                'code'  : SCORES_TO_CODES[score]
            });
        }
        return chartData.sort(this.sortChartData);
    }


    getGrossLineChartData = (currentHole) => {
        var chartData = {
            'data' : [],
            'average' : 0
        }
        if(!this.isEmpty(this._courseData)){
            chartData.average = this._courseData.AverageScore
            this._courseData.Competitions.forEach((comp, index) => {
                
                if(currentHole === ALL){
                    chartData.data.push({
                        date : comp.Date,
                        gross : comp.Gross
                    })

                }else{
                    comp.Holes.forEach((hole, index) => {
                        if(currentHole === hole.Number){
                            chartData.average = this._courseData.Holes[index].TotalStrokes / this._courseData.Competitions.length
                            
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

    getScoreValue = (score, par, result ) => {
        if(!isNaN(score)){
            return parseInt(score)
        }else{
            return par + RESULT_VALUES[result]
        }
    }

    isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }
}