import {ALL} from '../constants/constants'

export const getCourseStats = (data, hole) =>{

    var stats = []
    var all = ALL

    console.log(ALL)

    if(!data.Competitions){
        return stats
    }
    return calculateStats(data, hole).filter((stat)=>{
        
        if(stat.hole === null){
            return true
        }

        if(hole && hole !== all){
            if(stat.hole !== all){
                return true
            }
        }

        if(!hole || (hole && hole === all)){
            if(stat.hole === all){
                return true
            }
        }
        
        return false
    })
}

const calculateStats = (data, hole) => {
    
    if(!data.Holes){
        return []
    }

    var sortedHoles = getSortedHoles(data.Holes)
    var bestHole = sortedHoles[0].HoleNumber
    var worstHole = sortedHoles[sortedHoles.length - 1].HoleNumber
    
    var sortedCompetitions = getSortedCompetitions(data.Competitions)
    var bestComp = sortedCompetitions[0].Gross
    var worstComp = sortedCompetitions[sortedCompetitions.length - 1].Gross

    return[
        createStat("Rounds Played", "info", data.Competitions.length, null),
        createStat("Best Hole", "success", "Hole " + bestHole),
        createStat("Worst Hole", "danger", "Hole " + worstHole),
        createStat("Best Round", "success", getScorePrefix(bestComp)  + bestComp),
        createStat("Worst Round", "danger", getScorePrefix(worstComp) + worstComp)
    ]
}

const getSortedHoles = (holes) =>{
    return  holes.slice(0).sort((hole1, hole2) => {
        if(hole1.TotalToPar < hole2.TotalToPar){
            return -1
        }
        if(hole1.TotalToPar > hole2.TotalToPar){
            return 1
        }
        return 0
    })
}

const getSortedCompetitions = (competitions) => {
    return competitions.slice(0).sort((comp1, comp2) => {
        if(comp1.Gross < comp2.Gross){
            return -1
        }
        if(comp2.Gross < comp1.Gross){
            return 1
        }
        return 0
    })
}

const getScorePrefix = (score) => {
    return score > 0 ? "+ " : ""
}

const createStat = (title, titleColor, body, hole = ALL) =>{
    return{
        hole            : hole,
        title           : title,
        titleColor      : titleColor,
        body            : body
    }
}