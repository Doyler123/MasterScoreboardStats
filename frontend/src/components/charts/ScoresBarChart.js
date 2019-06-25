import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer
} from 'recharts';
import * as util from '../../util/BarChartUtil'

const ScoresBarChart = (props) => {

    return (
        <ResponsiveContainer width='100%' aspect={4.5/3.0}>
            <BarChart
                data={props.data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="6 6" />
                <XAxis interval={0} tick={{fontSize: '10px'}}dataKey="score"/>
                <YAxis type="number" tickCount={8} domain={[0, 'dataMax + 25']}/>
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" >
                    {props.data.map(util.fillBar)}
                    <LabelList dataKey="count" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}


export default ScoresBarChart