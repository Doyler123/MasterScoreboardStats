import React from 'react';

import ChartGrid from '../charts/layout/ChartGrid'
import GrossLineChart from '../charts/GrossLineChart'
import ChartItem from '../charts/layout/ChartItem'
import AllHolesBarChartContainer from '../charts/AllHolesBarChartContainer'
import { getScoresBarChartData, getParTotalsBarChartData, getGrossLineChartData } from '../../util/ChartUtil'
import CourseStats from '../stats/CourseStats'
import {ALL} from '../../constants/constants'
import BarChartContainer from '../charts/BarChartContainer';
import ParTotalsBarChart from '../charts/ParTotalsBarChart';
import ScoresBarChart from '../charts/ScoresBarChart';

const CourseDataGrid = ({ courseData, hole }) => {

    return (
        <div style={{margin: "0px 10% 0px 10%"}}>
            <CourseStats data={courseData} hole={hole}/>
            <ChartGrid>
                {courseData.Competitions.length < 100 ? 

                    <React.Fragment>
                        <ChartItem xs={12} sm={6} lg={5}>
                            <BarChartContainer 
                                data={[
                                    <ScoresBarChart hole={hole} data={getScoresBarChartData(courseData, hole)} />,
                                    <ParTotalsBarChart data={getParTotalsBarChartData(courseData)} />
                                ]}
                                hole={hole} 
                            />
                        </ChartItem>
                        <ChartItem xs={12} sm={12} lg={7}>
                            <GrossLineChart data={getGrossLineChartData(courseData, hole)} hole={hole}/>
                        </ChartItem>
                    </React.Fragment> 
                
                : 
                
                    <React.Fragment>
                        <ChartItem xs={12} sm={6} lg={6}>
                            <BarChartContainer 
                                data={[
                                    <ScoresBarChart large={true} data={getScoresBarChartData(courseData, hole)} />
                                ]}
                                hole={hole} 
                            />
                        </ChartItem>
                        <ChartItem xs={12} sm={6} lg={6}>
                            <BarChartContainer 
                                data={[
                                    <ParTotalsBarChart data={getParTotalsBarChartData(courseData)} />
                                ]}
                                hole={hole} 
                            />
                        </ChartItem>
                        <ChartItem xs={12} sm={12} lg={12}>
                            <GrossLineChart large={true} data={getGrossLineChartData(courseData, hole)} hole={hole}/>
                        </ChartItem>
                    </React.Fragment>
                }

                {hole === ALL ?
                <ChartItem xs={12} sm={12}>
                    <AllHolesBarChartContainer data={courseData}/>
                </ChartItem> : null}

            </ChartGrid>
        </div>
      );
}

export default CourseDataGrid;