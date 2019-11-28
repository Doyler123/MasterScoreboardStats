import React from 'react';
import StatsGrid from '../layout/stats/StatsGrid'
import StatItem from '../layout/stats/StatItem'
import * as util from './../../util/StatsUtil'


const CourseStats = props =>{

    let {data, hole} = props

    return (
        <StatsGrid>
            {util.getCourseStats(data, hole).map((statItem)=>(
                <StatItem 
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