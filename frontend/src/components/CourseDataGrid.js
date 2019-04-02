import React, { Component } from 'react';

import GridDataLayout from './layout/GridDataLayout'
import ScoresChart from './charts/ScoresBarChart'
import GrossLineChart from './charts/GrossLineChart'
import GridItem from './layout/GridItem'
import ParTotalsBarChart from './charts/ParTotalsBarChart'
import AllHolesBarChart from './charts/AllHolesBarChart'
import ChartDataCalculator from '../util/ChartDataCalculator'



import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import {ALL} from '../constants/constants'

export default (props) =>{

    var chartDataCalculator = new ChartDataCalculator()

    return (
        <GridDataLayout>
            <GridItem xs={12} sm={6}>
                <ScoresChart data={chartDataCalculator.getScoresBarChartData(props.data, props.hole)}/>
            </GridItem>
            <GridItem xs={12} sm={6}>
                <GrossLineChart data={chartDataCalculator.getGrossLineChartData(props.data, props.hole)} hole={props.hole}/>
            </GridItem>
            {props.hole === ALL ?
            <GridItem xs={12} sm={12}>
                <AllHolesBarChart data={props.data}/>
                {/* <Tabs
                    value={0}
                    onChange={()=>{}}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    >
                    <Tab icon={<PhoneIcon />} label="RECENTS" />
                    <Tab icon={<FavoriteIcon />} label="FAVORITES" />
                    <Tab icon={<PersonPinIcon />} label="NEARBY" />
                </Tabs> */}
            </GridItem> : null}
            {props.hole === ALL ? 
            <GridItem xs={12} sm={6}>
                <ParTotalsBarChart data={chartDataCalculator.getParTotalsBarChartData(props.data)} />
            </GridItem> : null}
        </GridDataLayout>
      );
}