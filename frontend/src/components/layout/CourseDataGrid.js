import React from 'react';

import Grid from '@material-ui/core/Grid';
import ChartGrid from '../charts/layout/ChartGrid'
import ScoresChart from '../charts/ScoresBarChart'
import GrossLineChart from '../charts/GrossLineChart'
import ChartItem from '../charts/layout/ChartItem'
import ParTotalsBarChart from '../charts/ParTotalsBarChart'
import AllHolesBarChartContainer from '../charts/AllHolesBarChartContainer'
import ChartDataCalculator from '../../util/ChartDataCalculator'
import CourseStats from '../stats/CourseStats'
import {ALL} from '../../constants/constants'

const CourseDataGrid = props =>{

    var chartDataCalculator = new ChartDataCalculator()

    return (
        <div>
            <CourseStats data={props.data} hole={props.hole}/>
            <ChartGrid>
                <ChartItem xs={12} sm={6} lg={5}>
                    <ScoresChart data={chartDataCalculator.getScoresBarChartData(props.data, props.hole)}/>
                </ChartItem>
                {props.hole === ALL ? 
                <ChartItem xs={12} sm={6} lg={5}>
                    <ParTotalsBarChart data={chartDataCalculator.getParTotalsBarChartData(props.data)} />
                </ChartItem> : null}
                {props.hole === ALL ?
                <ChartItem xs={12} sm={12} lg={10}>
                    <AllHolesBarChartContainer data={props.data}/>
                </ChartItem> : null}
                <ChartItem xs={12} sm={12} lg={10}>
                    <GrossLineChart data={chartDataCalculator.getGrossLineChartData(props.data, props.hole)} hole={props.hole}/>
                </ChartItem>
            </ChartGrid>
        </div>
      );
}

export default CourseDataGrid;