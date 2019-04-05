import React, { Component } from 'react';

import ChartDataGrid from './ChartDataGrid'
import ScoresChart from '../charts/ScoresBarChart'
import GrossLineChart from '../charts/GrossLineChart'
import ChartItem from './ChartItem'
import ParTotalsBarChart from '../charts/ParTotalsBarChart'
import AllHolesBarChart from '../charts/AllHolesBarChart'
import ChartDataCalculator from '../../util/ChartDataCalculator'
import StatsGrid from '../layout/StatsGrid'
import StatItem from '../layout/StatItem'
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-default.css';

import Typography from '@material-ui/core/Typography';
import {ALL} from '../../constants/constants'

export default (props) =>{

    var chartDataCalculator = new ChartDataCalculator()

    return (
        <div>
            <StatsGrid>
                <StatItem xs={6} sm={2} lg={2}>
                    <Typography component="h4" variant="display2" gutterBottom>
                        <Odometer value={props.data.Holes ? 1234 : 0} duration={3000} format="(.ddd),dd" />
                    </Typography>
                </StatItem>
                <StatItem xs={6} sm={2} lg={2}>
                    <Typography component="h4" variant="display2" gutterBottom>
                        <Odometer value={props.data.Holes ? 1234 : 0} duration={3000} format="(.ddd),dd" />
                    </Typography>
                </StatItem>
                <StatItem xs={6} sm={2} lg={2}>
                    <Typography component="h4" variant="display2" gutterBottom>
                        <Odometer value={props.data.Holes ? 1234 : 0} duration={3000} format="(.ddd),dd" />
                    </Typography>
                </StatItem>
                <StatItem xs={6} sm={2} lg={2}>
                    <Typography component="h4" variant="display2" gutterBottom>
                        <Odometer value={props.data.Holes ? 1234 : 0} duration={3000} format="(.ddd),dd" />
                    </Typography>
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