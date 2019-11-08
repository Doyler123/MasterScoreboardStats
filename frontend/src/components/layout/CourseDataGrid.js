import React from 'react';

import ChartGrid from '../charts/layout/ChartGrid'
import GrossLineChart from '../charts/GrossLineChart'
import ChartItem from '../charts/layout/ChartItem'
import AllHolesBarChartContainer from '../charts/AllHolesBarChartContainer'
import { getScoresBarChartData, getParTotalsBarChartData, getGrossLineChartData } from '../../util/ChartUtil'
import CourseStats from '../stats/CourseStats'
import {ALL} from '../../constants/constants'
import BarChartContainer from '../charts/BarChartContainer';

const CourseDataGrid = ({ courseData, hole }) => {

    return (
        <div style={{margin: "0px 10% 0px 10%"}}>
            <CourseStats data={courseData} hole={hole}/>
            <ChartGrid>
                <ChartItem xs={12} sm={6} lg={5}>
                    <BarChartContainer 
                        data={[
                            getScoresBarChartData(courseData, hole),
                            getParTotalsBarChartData(courseData)
                        ]} 
                    />
                </ChartItem>
                <ChartItem xs={12} sm={12} lg={7}>
                    <GrossLineChart data={getGrossLineChartData(courseData, hole)} hole={hole}/>
                </ChartItem>

                {hole === ALL ?
                <ChartItem xs={12} sm={12}>
                    <AllHolesBarChartContainer data={courseData}/>
                </ChartItem> : null}

            </ChartGrid>
        </div>
      );
}

export default CourseDataGrid;