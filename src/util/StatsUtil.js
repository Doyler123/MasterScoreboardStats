import {ALL, COMBINED, OUTLIER_SCRATCH_LIMIT} from '../constants/constants'
import ordinal from 'ordinal'

export const getCourseStats = (data, hole, currentCourse) =>{

    var stats = []

    if(!data.every(course => course.Competitions)){
        return stats
    }
    
    return calculateStats(data, hole, currentCourse)
}

const calculateStats = (data, hole, currentCourse) => {
    
    if(!data.every(course => course.Holes)){
        return []
    }

    let sortedHoles;
    let bestHole;
    let worstHole;
    let holeRank;

    if(currentCourse !== COMBINED){
        sortedHoles = getSortedHoles(data[0].Holes)
        bestHole = sortedHoles[0].HoleNumber
        worstHole = sortedHoles[sortedHoles.length - 1].HoleNumber
        holeRank = getHoleRank(sortedHoles, hole)
    }
    
    
    let allComps = data.flatMap(course => course.Competitions).filter(comp => comp.scratches <= OUTLIER_SCRATCH_LIMIT)
    let sortedCompetitions = getSortedCompetitions(allComps)
    let bestComp = sortedCompetitions[0].Gross
    let bestCompDate = sortedCompetitions[0].Date
    let worstComp = sortedCompetitions[sortedCompetitions.length - 1].Gross
    let worstCompDate = sortedCompetitions[sortedCompetitions.length - 1].Date

    let allStats = [
        createStat("Rounds\nPlayed", "info", allComps.length, null),
    ]

    let courseStats = (!hole || hole === ALL) && currentCourse !== COMBINED ? [
        createStat("Best\nHole", "success", "Hole " + bestHole, null, bestHole),
        createStat("Worst\nHole", "danger", "Hole " + worstHole, null, worstHole),
        createStat("Best\nRound", "success", getScorePrefix(bestComp)  + bestComp, bestCompDate),
        createStat("Worst\nRound", "danger", getScorePrefix(worstComp) + worstComp, worstCompDate),
    ] : []

    let holeStats = hole && hole !== ALL ? [
        createStat("Average\n(Par " + getHolePar(data[0], hole) +")", "info", getHoleAverage(data[0], hole).toFixed(2), null, null, hole),
        createStat("Difficulty\nRank", "info", ordinal(holeRank), null, null, hole)
    ] : []

    let combinedStats = currentCourse && currentCourse === COMBINED ? [
        createStat("Best\nRound", "success", getScorePrefix(bestComp)  + bestComp, bestCompDate),
        createStat("Worst\nRound", "danger", getScorePrefix(worstComp) + worstComp, worstCompDate)
    ] : []
    
    return allStats.concat(courseStats, holeStats, combinedStats);
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
        if(hole.HoleNumber === currentHole){
            rank = index + 1
            break
        }
    }

    return (sortedHoles.length + 1) - rank
}


const getHoleAverage = (data, currentHole) => {
    if(currentHole === ALL) {
        return null
    }
    return data.Holes.find(hole => hole.HoleNumber === currentHole).TotalStrokes / data.Competitions.length
}


const getHolePar = (data, currentHole) => {
    if(currentHole === ALL) {
        return null
    }
    return data.Holes.find(hole => hole.HoleNumber === currentHole).HolePar
}

const createStat = (title, titleColor, body, date, holeNumber, hole = ALL) =>{
    return{
        hole            : hole,
        title           : title,
        titleColor      : titleColor,
        body            : body,
        date            : date,
        holeNumber      : holeNumber
    }
}