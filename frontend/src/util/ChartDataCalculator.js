import {SCORES_TO_CODES, ALL, NA} from '../constants/constants'

export default class ChartDataCalculator{

    _baseData = {}

    constructor(course, currentHole){
        this._baseData = this.getBaseData(course, currentHole);
    }
    
    getBaseData = (course, currentHole) => {
        var baseData = {}
        if(course){
            course.Competitions.forEach(comp => {
                comp.Holes.forEach((hole, index) =>{
                    if(currentHole === ALL || hole.Number === currentHole){
                        var par = course.CourseInfo.Holes[index].Par
                        if(hole.Result in baseData){
                            if(par in baseData[hole.Result]){
                                baseData[hole.Result][par] += 1
                            }else{
                                baseData[hole.Result][par] = 1
                            }
                        }else{
                            baseData[hole.Result]= {[par]: 1}
                        }
                    }
                })
            });
        }
        return baseData
    }

    getScoresBarChartData = (course, currentHole) => {
        var chartData = []
        for (var score in this._baseData) {
            if (!this._baseData.hasOwnProperty(score) || score === NA) continue;
            

            var count = this._baseData[score][3] ? this._baseData[score][3] : 0
            count += this._baseData[score][4] ? this._baseData[score][4] : 0
            count += this._baseData[score][5] ? this._baseData[score][5] : 0

            chartData.push({
                'score' : score,
                'count' : count,
                'code'  : SCORES_TO_CODES[score]
            });
        }
        return chartData.sort(this.sortChartData);
    }
    

    getParTotalsBarChartData = (course, currentHole) => {
        var chartData = []
        for (var score in this._baseData) {
            if (!this._baseData.hasOwnProperty(score) || score === NA) continue;
            chartData.push({
                'score' : score,
                'par3' : this._baseData[score][3] ? this._baseData[score][3] : 0,
                'par4' : this._baseData[score][4] ? this._baseData[score][4] : 0,
                'par5' : this._baseData[score][5] ? this._baseData[score][5] : 0,
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
}