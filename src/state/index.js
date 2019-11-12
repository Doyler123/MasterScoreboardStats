import React, {createContext, useContext, useReducer} from 'react';

export const actions = {
    CHANGE_HOLE : "changeHole",
    CHNAGE_COURSE : "changeCourse"
}

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) =>(
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const defaultReducer = (state, action) => {
    switch(action.type){
      case actions.CHANGE_HOLE:
        return {
          ...state,
          hole: action.newHole
        }
        case actions.CHNAGE_COURSE:
          return{
            ...state,
            course: action.newCourse
          }
        default:
          return state
    }
  }