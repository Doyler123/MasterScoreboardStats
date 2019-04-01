import React, { Component } from 'react';

import GridDataLayout from './layout/GridDataLayout'
import ScoresChart from './charts/ScoresBarChart'
import GrossLineChart from './charts/GrossLineChart'
import GridItem from './layout/GridItem'
import ParTotalsBarChart from './charts/ParTotalsBarChart'
import AllHolesBarChart from './charts/AllHolesBarChart'
import ChartDataCalculator from '../util/ChartDataCalculator'

import {ALL} from '../constants/constants'

export default (props) =>{

    var chartDataCalculator = new ChartDataCalculator(props.data, props.hole)

    return (
        <GridDataLayout>
            <GridItem xs={12} sm={6}>
                <ScoresChart data={chartDataCalculator.getScoresBarChartData(props.hole)}/>
            </GridItem>
            <GridItem xs={12} sm={6}>
                <GrossLineChart data={chartDataCalculator.getGrossLineChartData(props.hole)} hole={props.hole}/>
            </GridItem>
            {props.hole === ALL ?
            <GridItem xs={12} sm={12}>
                <AllHolesBarChart data={chartDataCalculator.getCourseData()}/>
            </GridItem> : null}
            {props.hole === ALL ? 
            <GridItem xs={12} sm={6}>
                <ParTotalsBarChart data={chartDataCalculator.getParTotalsBarChartData()} />
            </GridItem> : null}
        </GridDataLayout>
      );
}