import {RESULT_VALUES} from '../constants/constants'
import moment from 'moment'

export const getInitialDateRange = (comps) =>{
    if(comps.length < 1){
      return null
    }

    var date1 = moment(comps[comps.length - 1].Date)
    var date2 = moment(comps[0].Date)
    
    if(!date1.isValid || !date2.isValid){
      return null
    }

    return [date1, date2]
}



export const calculateCourseData = (course, dateRange) => {
    var courseData = {}
    if(course){
        courseData = {
            'AverageScore'  : 0,
            'Competitions'  : [],
            'Holes'         : [],
            'ParTotals'     : {}
        }

        course.Competitions.forEach((comp, compIndex) => {

            if(dateRange && dateRange.length === 2){
                if(moment(comp.Date).isBefore(dateRange[0]) || moment(comp.Date).isAfter(dateRange[1])){
                    return
                }
            }

            comp['Gross'] = 0
            
            comp.Date = parseDate(comp.Date)

            comp.Holes.forEach((hole, holeIndex) =>{

                
                comp.Gross += RESULT_VALUES[hole.Result];
                var par = course.CourseInfo.Holes[holeIndex].Par
                
                if(!courseData.Holes[holeIndex]){

                    courseData.Holes.push({
                        "HoleNumber"    : hole.Number,
                        "HolePar"       : par,
                        [hole.Result]   : 1,
                        'TotalStrokes'  : getScoreValue(hole.Score, par, hole.Result),
                        'TotalToPar'    : RESULT_VALUES[hole.Result]
                    })
                    
                }else{

                    if(hole.Result in courseData.Holes[holeIndex]){
                        courseData.Holes[holeIndex][hole.Result] += 1
                    }else{
                        courseData.Holes[holeIndex][hole.Result] = 1
                    }
                    courseData.Holes[holeIndex].TotalStrokes  += getScoreValue(hole.Score, par, hole.Result)
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

            courseData.AverageScore += comp.Gross
            courseData.Competitions.push(comp)
        });

        courseData.AverageScore = courseData.AverageScore/courseData.Competitions.length
    }
    return courseData
}

const getScoreValue = (score, par, result ) => {
    if(!isNaN(score)){
        return parseInt(score)
    }else{
        return par + RESULT_VALUES[result]
    }
}

const parseDate = (date) =>{
    return date
}
