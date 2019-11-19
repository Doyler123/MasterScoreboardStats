import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer
} from 'recharts';
import { fillBar } from '../../util/ChartUtil'


const ScoresBarChart = ({data}) => {

    return (
        <ResponsiveContainer width='100%' aspect={4.5/3.0}>
            <BarChart
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="6 6" />
                <XAxis interval={0} tick={{fontSize: '10px'}}dataKey="score"/>
                <YAxis type="number" tickCount={8} domain={[0, 'dataMax + 25']}/>
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" >
                    {data.map(fillBar)}
                    <LabelList dataKey="count" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}


export default ScoresBarChart