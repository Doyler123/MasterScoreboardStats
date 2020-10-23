import React from 'react';

import ChartGrid from './charts/ChartGrid'
import GrossLineChartContainer from '../charts/GrossLineChartContainer'
import ChartItem from './charts/ChartItem'
import AllHolesBarChartContainer from '../charts/AllHolesBarChartContainer'
import { getScoresBarChartData, getParTotalsBarChartData, getGrossLineChartData, getScoresLineChartData } from '../../util/ChartUtil'
import CourseStats from '../stats/CourseStats'
import {ALL, COMBINED} from '../../constants/constants'
import BarChartContainer from '../charts/BarChartContainer';
import ParTotalsBarChart from '../charts/ParTotalsBarChart';
import ScoresBarChart from '../charts/ScoresBarChart';
import AllRoundsTable from '../tables/AllRoundsTable';
import { useStateValue, actions } from '../../state';
import ScoresLineChart from '../charts/ScoresLineChart';

const CourseDataGrid = ({ courseData, hole, course, combinedCourseData }) => {

    const [{}, dispatch ] = useStateValue();

    return (
        <div style={{margin: "0px 10% 0px 10%"}}>

            <CourseStats 
                data={course === COMBINED ? combinedCourseData : [courseData]} 
                hole={hole} 
                currentCourse={course} 
                actions={actions}   
                dispatch={dispatch}   
            />

            {course !== COMBINED ? 
                <ChartGrid>

                    {courseData.Competitions.length < 100 ? 

                        <React.Fragment>
                            <ChartItem xs={12} sm={6} lg={5}>
                                <BarChartContainer 
                                    data={[
                                        <ScoresBarChart hole={hole} data={getScoresBarChartData([courseData], hole)} />,
                                        <ParTotalsBarChart data={getParTotalsBarChartData([courseData])} />
                                    ]}
                                    hole={hole} 
                                />
                            </ChartItem>
                            <ChartItem xs={12} sm={12} lg={7}>
                                <GrossLineChartContainer chartData={getGrossLineChartData([courseData], hole)} hole={hole} course={course} actions={actions} dispatch={dispatch} courseData={[courseData]}/>
                            </ChartItem>
                        </React.Fragment> 
                    
                    : 
                    
                        <React.Fragment>
                            <ChartItem xs={12} sm={6} lg={6}>
                                <BarChartContainer 
                                    data={[
                                        <ScoresBarChart large={true} data={getScoresBarChartData([courseData], hole)} />
                                    ]}
                                    hole={hole} 
                                />
                            </ChartItem>
                            <ChartItem xs={12} sm={6} lg={6}>
                                <BarChartContainer 
                                    data={[
                                        <ParTotalsBarChart data={getParTotalsBarChartData([courseData])} />
                                    ]}
                                    hole={hole} 
                                />
                            </ChartItem>
                            <ChartItem xs={12} sm={12} lg={12}>
                                <GrossLineChartContainer large={true} chartData={getGrossLineChartData([courseData], hole)} hole={hole} actions={actions} dispatch={dispatch} courseData={[courseData]}/>
                            </ChartItem>
                        </React.Fragment>
                    }

                    {hole === ALL ?
                    <ChartItem xs={12} sm={12}>
                        <AllHolesBarChartContainer data={courseData} />
                    </ChartItem> : null}

                    {hole === ALL ?
                    <ChartItem xs={12} sm={12}>
                        <AllRoundsTable data={[courseData]}/>
                    </ChartItem> : null}

                </ChartGrid> 
            : null}
            {course === COMBINED ? 
                <ChartGrid>
                    
                    <ChartItem xs={12} sm={6} lg={5}>
                        <BarChartContainer 
                            data={[
                                <ScoresBarChart hole={hole} data={getScoresBarChartData(combinedCourseData, hole)} />,
                                <ParTotalsBarChart data={getParTotalsBarChartData(combinedCourseData)} />
                            ]}
                            hole={hole} 
                        />
                    </ChartItem>
                    <ChartItem xs={12} sm={12} lg={7}>
                        <GrossLineChartContainer chartData={getGrossLineChartData(combinedCourseData, hole)} hole={hole} actions={actions} dispatch={dispatch} course={course} courseData={combinedCourseData}/>
                    </ChartItem>
                    <ChartItem xs={12} sm={12}>
                        <ScoresLineChart data={getScoresLineChartData(combinedCourseData)}/>
                    </ChartItem>
                    <ChartItem xs={12} sm={12}>
                        <AllRoundsTable data={combinedCourseData}/>
                    </ChartItem>

                </ChartGrid> 
            : null}
        </div>
      );
}

export default CourseDataGrid;