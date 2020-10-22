import React from 'react';
import StatsGrid from '../layout/stats/StatsGrid'
import StatItem from '../layout/stats/StatItem'
import * as util from './../../util/StatsUtil'


const CourseStats = props =>{

    let {data, hole, currentCourse, actions, dispatch} = props;  

    const handleClickComp = (compId) => {
        dispatch({
            type: actions.SELECT_COMP,
            selectedComp: compId
        })
    }  

    const handleClickHole = (hole) => {
        dispatch({
            type: actions.CHANGE_HOLE,
            newHole: hole
        })
    }

    return (
        <StatsGrid>
            {util.getCourseStats(data, hole, currentCourse).map((statItem)=>(
                <StatItem 
                    key             =   {statItem.title}
                    title           =   {statItem.title}
                    titleColor      =   {statItem.titleColor}
                    body            =   {statItem.body}
                    date            =   {statItem.date}
                    holeNumber      =   {statItem.holeNumber}
                    handleClickComp =   {handleClickComp}
                    handleClickHole =   {handleClickHole}
                    >
                </StatItem>
            ))}
        </StatsGrid>
      );
}

export default CourseStats;