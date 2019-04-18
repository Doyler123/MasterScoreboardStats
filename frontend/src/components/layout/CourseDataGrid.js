import React from 'react';

import ChartDataGrid from './ChartDataGrid'
import ScoresChart from '../charts/ScoresBarChart'
import GrossLineChart from '../charts/GrossLineChart'
import ChartItem from './ChartItem'
import ParTotalsBarChart from '../charts/ParTotalsBarChart'
import AllHolesBarChart from '../charts/AllHolesBarChart'
import ChartDataCalculator from '../../util/ChartDataCalculator'
import StatsGrid from '../layout/StatsGrid'
import StatItem from '../layout/StatItem'

import {ALL} from '../../constants/constants'

const CourseDataGrid = props =>{

    const { classes } = props;

    var chartDataCalculator = new ChartDataCalculator()

    return (
        <div>
            <StatsGrid>
                <StatItem xs={6} sm={2} lg={2} 
                    title       ={"Best Hole"}
                    titleColor  ={"success"}
                    heading     ={"Hole 18"} 
                    subHeading  ={"Par 5"} 
                    stats       ={[{name : "Stroke Average", value : 5.23}]}>
                </StatItem>
                <StatItem xs={6} sm={2} lg={2} 
                    title       ={"Worst Hole"}
                    titleColor  ={"danger"}
                    heading     ={"Hole 5"} 
                    subHeading  ={"Par 4"} 
                    stats       ={[{name : "Stroke Average", value : 5.98}]}>
                </StatItem>
                <StatItem xs={6} sm={2} lg={2} 
                    title       ={"Best Hole"}
                    titleColor  ={"success"}
                    heading     ={"Hole 18"} 
                    subHeading  ={"Par 5"} 
                    stats       ={[{name : "Stroke Average", value : 5.23}]}>
                </StatItem>
                <StatItem xs={6} sm={2} lg={2} 
                    title       ={"Best Hole"}
                    titleColor  ={"success"}
                    heading     ={"Hole 18"} 
                    subHeading  ={"Par 5"} 
                    stats       ={[{name : "Stroke Average", value : 5.23}]}>
                </StatItem>
                <StatItem xs={6} sm={2} lg={2} 
                    title       ={"Best Hole"}
                    titleColor  ={"success"}
                    heading     ={"Hole 18"} 
                    subHeading  ={"Par 5"} 
                    stats       ={[{name : "Stroke Average", value : 5.23}]}>
                </StatItem>
            </StatsGrid>
            <ChartDataGrid>
                <ChartItem xs={12} sm={6} lg={4}>
                    <ScoresChart data={chartDataCalculator.getScoresBarChartData(props.data, props.hole)}/>
                </ChartItem>
                <ChartItem xs={12} sm={6} lg={4}>
                    <GrossLineChart data={chartDataCalculator.getGrossLineChartData(props.data, props.hole)} hole={props.hole}/>
                </ChartItem>
                {props.hole === ALL ? 
                <ChartItem xs={12} sm={6} lg={4}>
                    <ParTotalsBarChart data={chartDataCalculator.getParTotalsBarChartData(props.data)} />
                </ChartItem> : null}
                {props.hole === ALL ?
                <ChartItem xs={12} sm={12} lg={8}>
                    <AllHolesBarChart data={props.data}/>
                </ChartItem> : null}
            </ChartDataGrid>
        </div>
      );
}

export default CourseDataGrid;