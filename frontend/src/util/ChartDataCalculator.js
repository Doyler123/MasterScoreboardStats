import {SCORES_TO_CODES, RESULT_VALUES, ALL, NA} from '../constants/constants'

export default class ChartDataCalculator{

    _baseData = {}

    constructor(course){
        if(course){
                this._baseData = this.getBaseData(course);
        }
    }
    
    getBaseData = (course) => {
        var baseData = {
            'Course' : {
                'AverageScore' : 0
            },
            'Competitions' : course.Competitions,
            'Holes' : {},
            'Totals' : {}
        }
        if(course){
            course.Competitions.forEach((comp, compIndex) => {

                baseData.Competitions[compIndex]['Gross'] = 0
                
                comp.Holes.forEach((hole, holeIndex) =>{

                    baseData.Competitions[compIndex].Gross += RESULT_VALUES[hole.Result];
                    
                    var par = course.CourseInfo.Holes[holeIndex].Par
                    if(hole.Number in baseData.Holes){
                        if(hole.Result in baseData.Holes[hole.Number].Scores){
                            baseData.Holes[hole.Number].Scores[hole.Result] += 1
                        }else{
                            baseData.Holes[hole.Number].Scores[hole.Result] = 1
                        }
                        baseData.Holes[hole.Number].Total += this.getScoreValue(hole.Score, par, hole.Result)
                    }else{
                        baseData.Holes[hole.Number]= {
                            "HoleInfo": { 'Par' : par},
                            "Scores" : {[hole.Result] : 1},
                            'Total' : this.getScoreValue(hole.Score, par, hole.Result)
                        }
                    }


                    if(hole.Result in baseData.Totals){
                        if(par in baseData.Totals[hole.Result]){
                            baseData.Totals[hole.Result][par] += 1
                        }else{
                            baseData.Totals[hole.Result][par] = 1
                        }
                    }else{
                        baseData.Totals[hole.Result]= {[par]: 1}
                    }
                    
                })

                baseData.Course.AverageScore += baseData.Competitions[compIndex].Gross
            });

            baseData.Course.AverageScore = baseData.Course.AverageScore/baseData.Competitions.length
        }
        console.log(baseData)
        return baseData
    }

    getScoresBarChartData = (currentHole) => {
        var chartData = []
        if(currentHole === ALL){
            for (var score in this._baseData.Totals) {
                if (!this._baseData.Totals.hasOwnProperty(score)) continue;

                var count = this._baseData.Totals[score][3] ? this._baseData.Totals[score][3] : 0
                count += this._baseData.Totals[score][4] ? this._baseData.Totals[score][4] : 0
                count += this._baseData.Totals[score][5] ? this._baseData.Totals[score][5] : 0

                chartData.push({
                    'score' : score,
                    'count' : count,
                    'code'  : SCORES_TO_CODES[score]
                });
            }
        }else{
            for (var score in this._baseData.Holes[currentHole].Scores) {
                if (!this._baseData.Holes[currentHole].Scores.hasOwnProperty(score)) continue;
                var count = this._baseData.Holes[currentHole].Scores[score]
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
        for (var score in this._baseData.Totals) {
            if (!this._baseData.Totals.hasOwnProperty(score) || score === NA) continue;
            chartData.push({
                'score' : score,
                'par3' : this._baseData.Totals[score][3] ? this._baseData.Totals[score][3] : 0,
                'par4' : this._baseData.Totals[score][4] ? this._baseData.Totals[score][4] : 0,
                'par5' : this._baseData.Totals[score][5] ? this._baseData.Totals[score][5] : 0,
                'code'  : SCORES_TO_CODES[score]
            });
        }
        return chartData.sort(this.sortChartData);
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
}