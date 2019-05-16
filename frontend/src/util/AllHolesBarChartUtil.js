import {SCORES_TO_COLOURS, DEFAULT_ALL_HOLES_TAB, BIRDE, BOGEY} from '../constants/constants'


export const calculateDataMin = (dataMin) => {
    return dataMin < 0 ? dataMin - 5 : 0
}

export const getChartData = (data, dataField) =>{
    var chartData = []
    if(data.Holes){
        data.Holes.forEach((hole, index) => {
            chartData.push({
                "hole" : "Hole " + (index + 1),
                "total" : hole[dataField] ? hole[dataField] : 0
            })
        });
    }
    return chartData
}

export const getBarColour = (entry, tab) => {
    if(tab === DEFAULT_ALL_HOLES_TAB){
        if(entry.total < 0){
            return SCORES_TO_COLOURS[BIRDE]
        }
        return SCORES_TO_COLOURS[BOGEY]
    }
    return SCORES_TO_COLOURS[tab]
}