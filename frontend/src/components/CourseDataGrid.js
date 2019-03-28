import React, { Component } from 'react';

import GridDataLayout from './layout/GridDataLayout'
import ScoresChart from './charts/ScoresBarChart'
import GrossLineChart from './charts/GrossLineChart'
import GridItem from './layout/GridItem'
import ParTotalsBarChart from './charts/ParTotalsBarChart'
import ChartDataCalculator from '../util/ChartDataCalculator'

import {ALL} from '../constants/constants'

export default (props) =>{

    var chartDataCalculator = new ChartDataCalculator(props.data, props.hole)

    return (
        <GridDataLayout>
            <GridItem>
                <ScoresChart data={chartDataCalculator.getScoresBarChartData(props.hole)}/>
            </GridItem>
            <GridItem>
                <GrossLineChart data={props.data} hole={props.hole}/>
            </GridItem>
            {props.hole === ALL ? 
            <GridItem>
                <ParTotalsBarChart data={chartDataCalculator.getParTotalsBarChartData()} />
            </GridItem> : null}
        </GridDataLayout>
      );
}