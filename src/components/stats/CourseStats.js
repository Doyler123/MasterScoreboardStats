import React from 'react';
import StatsGrid from '../layout/stats/StatsGrid'
import StatItem from '../layout/stats/StatItem'
import * as util from './../../util/StatsUtil'


const CourseStats = props =>{

    let {data, hole, currentCourse} = props

    return (
        <StatsGrid>
            {util.getCourseStats(data, hole, currentCourse).map((statItem)=>(
                <StatItem 
                    key         =   {statItem.title}
                    title       =   {statItem.title}
                    titleColor  =   {statItem.titleColor}
                    body        =   {statItem.body} 
                    >
                </StatItem>
            ))}
        </StatsGrid>
      );
}

export default CourseStats;