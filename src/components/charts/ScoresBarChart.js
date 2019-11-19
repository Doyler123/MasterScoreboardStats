import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer
} from 'recharts';
import { fillBar, getDataMax } from '../../util/ChartUtil'
import {ALL} from '../../constants/constants'


const ScoresBarChart = ({large, hole, data}) => {

    let aspect = hole === ALL || large ? 4.5/3.0 : 4.5/3.9

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
                <YAxis type="number" tickCount={8} domain={[0, getDataMax]}/>
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