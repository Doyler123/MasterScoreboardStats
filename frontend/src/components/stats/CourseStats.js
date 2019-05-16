import React from 'react';

import StatsGrid from './StatsGrid'
import StatItem from './StatItem'

const getCourseStats = (data) =>{

    var stats = []

    if(!data.Competitions){
        return stats
    }

    stats.push(
        {title      : "Rounds Played",
        titleColor  : "info",
        body     : data.Competitions.length, 
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
        body     : "Hole " + bestHole.HoleNumber, 
        },

        {title      : "Worst Hole",
        titleColor  : "danger",
        body     : "Hole " + worstHole.HoleNumber, 
        },
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
                    body        =   {statItem.body} 
                    >
                </StatItem>
            ))}
        </StatsGrid>
      );
}

export default CourseStats;