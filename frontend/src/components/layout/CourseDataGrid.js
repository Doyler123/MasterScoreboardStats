import React from 'react';

import ChartGrid from '../charts/layout/ChartGrid'
import ScoresChart from '../charts/ScoresBarChart'
import GrossLineChart from '../charts/GrossLineChart'
import ChartItem from '../charts/layout/ChartItem'
import ParTotalsBarChart from '../charts/ParTotalsBarChart'
import AllHolesBarChartContainer from '../charts/AllHolesBarChartContainer'
import ChartDataCalculator from '../../util/ChartDataCalculator'

import {ALL} from '../../constants/constants'
import CourseStats from '../stats/CourseStats';

const CourseDataGrid = props =>{

    var chartDataCalculator = new ChartDataCalculator()

    return (
        <div>
            <CourseStats data={props.data}/>
            <ChartGrid>
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
                    <AllHolesBarChartContainer data={props.data}/>
                </ChartItem> : null}
            </ChartGrid>
        </div>
      );
}

export default CourseDataGrid;