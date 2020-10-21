import {RESULT_VALUES, SCORES, MS_DATE_FORMAT, VALUE_RESULTS} from '../constants/constants'
import moment from 'moment'

export const getInitialDateRange = (comps) =>{
    if(comps.length < 1){
      return null
    }

    let sortedComps = comps.sort((a, b) => {
        let dateA = moment(a.Date, MS_DATE_FORMAT);
        let dateB = moment(b.Date, MS_DATE_FORMAT);
        if(dateB.isBefore(dateA)){
            return -1
        }
        if(dateA.isBefore(dateB)){
            return 1
        }
        return 0;
    })

    var date1 = moment(sortedComps[sortedComps.length - 1].Date)
    var date2 = moment(sortedComps[0].Date)
    
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
            comp['pars'] = 0
            comp['birdies'] = 0
            comp['bogeys'] = 0
            comp['doubles'] = 0
            comp['triples'] = 0
            comp['scratches'] = 0
            
            comp.Date = parseDate(comp.Date)

            comp.Holes.forEach((hole, holeIndex) =>{

                switch(hole.Result){
                    case SCORES.BIRDIE:
                        comp.birdies += 1;
                        break;
                    case SCORES.PAR:
                        comp.pars += 1;
                        break;
                    case SCORES.BOGEY:
                        comp.bogeys += 1;
                        break;
                    case SCORES.DOUBLE:
                        comp.doubles += 1;
                        break;    
                    case SCORES.TRIPLE:
                        comp.triples += 1;
                        break;    
                    case SCORES.SCRATCH:
                        comp.scratches += 1;
                        break;    
                    default:
                }
                
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

export const getScoreValue = (score, par, result ) => {
    if(!isNaN(score)){
        return parseInt(score)
    }else{
        return parseInt(par) + RESULT_VALUES[result]
    }
}

export const getHoleResult = (score, par) => {
    if(!isNaN(score)){
        let value = parseInt(score) - parseInt(par);
        if(value >= 3){
            return VALUE_RESULTS['3'];
        }else if( value <= -2){
            return VALUE_RESULTS['-2'];
        }
        return VALUE_RESULTS[`${value}`]
    }else{
        return SCORES.SCRATCH
    }
}

const parseDate = (date) =>{
    return date
}

export const sortCourses = (courseA, courseB) => {
    let courseALatest = moment(courseA.Competitions[0].Date)
    let courseBLatest = moment(courseB.Competitions[0].Date)
    
    if(courseALatest.isAfter(courseBLatest)){
        return -1
    }else if(courseALatest.isSame(courseBLatest)){
        return 0
    }
    else {
        return 1
    }
}
