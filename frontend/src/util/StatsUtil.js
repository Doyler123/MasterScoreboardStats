import {ALL} from '../constants/constants'

export const getCourseStats = (data, hole) =>{

    var stats = []

    console.log(ALL)

    if(!data.Competitions){
        return stats
    }
    return calculateStats(data, hole)
}

const calculateStats = (data, hole) => {
    
    if(!data.Holes){
        return []
    }

    var sortedHoles = getSortedHoles(data.Holes)
    var bestHole = sortedHoles[0].HoleNumber
    var worstHole = sortedHoles[sortedHoles.length - 1].HoleNumber
    var holeRank = getHoleRank(sortedHoles, hole)
    

    var sortedCompetitions = getSortedCompetitions(data.Competitions)
    var bestComp = sortedCompetitions[0].Gross
    var worstComp = sortedCompetitions[sortedCompetitions.length - 1].Gross

    var allStats = [
        createStat("Rounds Played", "info", data.Competitions.length, null),
    ]

    var courseStats = !hole || hole === ALL ? [
        createStat("Best Hole", "success", "Hole " + bestHole),
        createStat("Worst Hole", "danger", "Hole " + worstHole),
        createStat("Best Round", "success", getScorePrefix(bestComp)  + bestComp),
        createStat("Worst Round", "danger", getScorePrefix(worstComp) + worstComp),
    ] : []

    var holeStats = hole && hole !== ALL ? [
        createStat("Average", "info", getHoleAverage(data, hole).toFixed(2), hole),
        createStat("Rank", "info", holeRank +"/"+ sortedHoles.length, hole)
    ] : []
    
    return allStats.concat(courseStats, holeStats)
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

const getHoleRank = (sortedHoles, currentHole) =>{
    var rank
    
    if(currentHole === ALL){
        return null
    }

    for(const [index, hole] of sortedHoles.entries()){
        console.log(currentHole, hole.HoleNumber)
        if(hole.HoleNumber === currentHole){
            rank = index + 1
            break
        }
    }

    return rank
}


const getHoleAverage = (data, currentHole) => {
    if(currentHole === ALL) {
        return null
    }
    return data.Holes.find(hole => hole.HoleNumber === currentHole).TotalStrokes / data.Competitions.length
}

const createStat = (title, titleColor, body, hole = ALL) =>{
    return{
        hole            : hole,
        title           : title,
        titleColor      : titleColor,
        body            : body
    }
}