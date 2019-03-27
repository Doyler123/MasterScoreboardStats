import React, { Component } from 'react';

import GridDataLayout from './layout/GridDataLayout'
import ScoresChart from './charts/ScoresBarChart'
import GrossLineChart from './charts/GrossLineChart'
import GridItem from './layout/GridItem'
import ParTotalsBarChart from './charts/ParTotalsBarChart'

import ChartDataCalculator from '../util/ChartDataCalculator'

export default (props) =>{

    var chartDataCalculator = new ChartDataCalculator(props.data, props.hole)

    return (
        <GridDataLayout>
            <GridItem>
                <ScoresChart data={chartDataCalculator.getScoresBarChartData(props.data, props.hole)}/>
            </GridItem>
            <GridItem>
                <GrossLineChart data={props.data} hole={props.hole}/>
            </GridItem>
            <GridItem>
                <ParTotalsBarChart data={chartDataCalculator.getParTotalsBarChartData(props.data, props.hole)} />
            </GridItem>
        </GridDataLayout>
      );
}