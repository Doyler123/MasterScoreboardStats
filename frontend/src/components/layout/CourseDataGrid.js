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
import BarChartContainer from '../charts/BarChartContainer';

const CourseDataGrid = props =>{

    var chartDataCalculator = new ChartDataCalculator()

    return (
        <div style={{margin: "0 10% 0px 10%"}}>
            <CourseStats data={props.data} hole={props.hole}/>
            <ChartGrid>
                <ChartItem xs={12} sm={6} lg={5}>
                    <BarChartContainer data={[chartDataCalculator.getScoresBarChartData(props.data, props.hole)
                                            , chartDataCalculator.getParTotalsBarChartData(props.data)]} />
                </ChartItem>
                <ChartItem xs={12} sm={12} lg={7}>
                    <GrossLineChart data={chartDataCalculator.getGrossLineChartData(props.data, props.hole)} hole={props.hole}/>
                </ChartItem>
                {props.hole === ALL ?
                <ChartItem xs={12} sm={12}>
                    <AllHolesBarChartContainer data={props.data}/>
                </ChartItem> : null}
            </ChartGrid>
        </div>
      );
}

export default CourseDataGrid;