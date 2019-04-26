import React from 'react';

import StatsGrid from '../layout/StatsGrid'
import StatItem from '../layout/StatItem'

const getCourseStats = (data) =>{

    var stats = []

    if(!data.Competitions){
        return stats
    }

    stats.push(
        {title      : "Rounds Played",
        titleColor  : "info",
        heading     : "", 
        subHeading  : data.Competitions.length, 
        stats       : [
                {name : "Over/Under",
                value : data.AverageScore.toFixed(2)}
            ]
        }
    )  
    return stats.concat(getBestAndWorstHole(data))
}

const getBestAndWorstHole = (data) => {
    
    if(!data.Holes){
        return []
    }

    var holes = data.Holes.slice(0).sort((hole1, hole2) => {
        if(hole1.TotalToPar < hole2.TotalToPar){
            return -1
        }
        if(hole1.TotalToPar > hole2.TotalToPar){
            return 1
        }
        return 0
    })


    var bestHole = holes[0]
    var worstHole = holes[data.Holes.length - 1]

    return[
        {title      : "Best Hole",
        titleColor  : "success",
        heading     : "Hole " + bestHole.HoleNumber, 
        subHeading  : "Par " + bestHole.HolePar, 
        stats       : [
            {name : "Stroke Average",
             value : (bestHole.TotalStrokes / data.Competitions.length).toFixed(2)}
        ]},

        {title      : "Worst Hole",
        titleColor  : "danger",
        heading     : "Hole " + worstHole.HoleNumber, 
        subHeading  : "Par " + worstHole.HolePar, 
        stats       : [
            {name : "Stroke Average",
             value : (worstHole.TotalStrokes / data.Competitions.length).toFixed(2)}
        ]},
    ]
}

const CourseStats = props =>{

    const {data} = props

    console.log(data)

    return (
        <StatsGrid>
            {getCourseStats(data).map((statItem)=>(
                <StatItem xs={6} sm={2} lg={2} 
                    title       =   {statItem.title}
                    titleColor  =   {statItem.titleColor}
                    heading     =   {statItem.heading} 
                    subHeading  =   {statItem.subHeading} 
                    stats       =   {statItem.stats}>
                </StatItem>
            ))}
        </StatsGrid>
      );
}

export default CourseStats;