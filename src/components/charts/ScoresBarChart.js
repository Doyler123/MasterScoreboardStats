import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer
} from 'recharts';
import { fillBar } from '../../util/ChartUtil'


const ScoresBarChart = ({aspect, data}) => {

    return (
        <ResponsiveContainer width='100%' aspect={aspect}>
            <BarChart
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="6 6" />
                <XAxis interval={0} tick={{fontSize: '10px'}}dataKey="score"/>
                <YAxis type="number" tickCount={8} domain={[0, dataMax => Math.max(100, Math.round(dataMax + (dataMax / 10)))]}/>
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