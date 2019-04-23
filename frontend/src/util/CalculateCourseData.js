import {RESULT_VALUES} from '../constants/constants'

const calculateCourseData = (course) => {
    var courseData = {}
    if(course){
        courseData = {
            'AverageScore'  : 0,
            'Competitions'  : course.Competitions,
            'Holes'         : [],
            'ParTotals'     : {}
        }

        course.Competitions.forEach((comp, compIndex) => {

            courseData.Competitions[compIndex]['Gross'] = 0
            
            comp.Holes.forEach((hole, holeIndex) =>{

                courseData.Competitions[compIndex].Gross += RESULT_VALUES[hole.Result];
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

            courseData.AverageScore += courseData.Competitions[compIndex].Gross
        });

        courseData.AverageScore = courseData.AverageScore/courseData.Competitions.length
    }
    console.log(courseData)
    return courseData
}

const getScoreValue = (score, par, result ) => {
    if(!isNaN(score)){
        return parseInt(score)
    }else{
        return par + RESULT_VALUES[result]
    }
}

export default calculateCourseData
