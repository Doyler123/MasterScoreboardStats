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
import Divider from '@material-ui/core/Divider';
import {ALL} from '../../constants/constants'

import Icon from "@material-ui/core/Icon";
import { withStyles } from '@material-ui/core/styles';


import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardIcon from "../Card/CardIcon.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardFooter from "../Card/CardFooter.jsx";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


const CourseDataGrid = props =>{

    const { classes } = props;

    var chartDataCalculator = new ChartDataCalculator()

    return (
        <div>
            <StatsGrid>
                <StatItem xs={6} sm={2} lg={2} 
                    heading     ={"Best Hole"} 
                    subHeading  ={"Hole 18"} 
                    value       ={1234} 
                    valueFormat ={"(.ddd),dd"}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                            Best Hole
                            {/* <Icon>content_copy</Icon> */}
                            </CardIcon>
                            <p className={classes.cardCategory}>Used Space</p>
                            <h3 className={classes.cardTitle}>
                            49/50 <small>GB</small>
                            </h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                Get more space
                            </a>
                            </div>
                        </CardFooter>
                    </Card>
                </StatItem>
                <StatItem xs={6} sm={2} lg={2} 
                    heading     ={"Best Hole"} 
                    subHeading  ={"Hole 18"} 
                    value       ={1234} 
                    valueFormat ={"(.ddd),dd"}>
                </StatItem>
                <StatItem xs={6} sm={2} lg={2} 
                    heading     ={"Best Hole"} 
                    subHeading  ={"Hole 18"} 
                    value       ={1234} 
                    valueFormat ={"(.ddd),dd"}>
                </StatItem>
                <StatItem xs={6} sm={2} lg={2} 
                    heading     ={"Best Hole"} 
                    subHeading  ={"Hole 18"} 
                    value       ={1234} 
                    valueFormat ={"(.ddd),dd"}>
                </StatItem>
                <StatItem xs={6} sm={2} lg={2} 
                    heading     ={"Best Hole"} 
                    subHeading  ={"Hole 12"} 
                    value       ={1234} 
                    valueFormat ={"(.ddd),dd"}>
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

export default withStyles(dashboardStyle)(CourseDataGrid);