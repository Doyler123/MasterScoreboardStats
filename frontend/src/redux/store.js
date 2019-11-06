import { createStore } from 'redux';
import * as Actions from './actions/Actions'
import {ALL} from '../constants/constants'


const appReducer = (state = {}, action) =>{
    
    switch(action.type){

        case Actions.INITIALISE:
        case Actions.CHANGE_COURSE:
            return {...state, 
                    course      : action.course, 
                    hole        : action.hole,
                    dateRange   : action.dateRange,
                    courseData  : action.courseData
                }
                
        case Actions.CHANGE_HOLE:
            return {...state, hole : action.hole}

        case Actions.CHANGE_DATE_RANGE:
            return {...state,
                 dateRange : action.dateRange,
                 courseData : action.courseData
                }

        case Actions.UPDATE_DATA:
            return {...state, courseData : action.courseData}
        default:
            return {...state, 
                course      : 0, 
                hole        : ALL,
                dateRange   : null,
                courseData  : {}
            }
    }

}

const store = createStore(appReducer)

export default store