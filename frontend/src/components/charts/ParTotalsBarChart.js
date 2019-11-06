import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import * as util from '../../util/BarChartUtil'

const ParTotalsBarChart = (props) => {

    return (
        <ResponsiveContainer width='100%' aspect={4.5/3.0}>
            <BarChart
                data={props.data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="6 6" />
                <XAxis tick={{fontSize: '10px'}} interval={0} dataKey="score"/>
                <YAxis type="number" tickCount={8} domain={[0, 'dataMax + 25']}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="Par 3" fill="#008AD8" >
                    {props.data.map(util.fillBar)}
                </Bar>
                <Bar dataKey="Par 4" fill="#CC9900" >
                    {props.data.map(util.fillBar)}
                </Bar>
                <Bar dataKey="Par 5" fill="#CC0033" >
                    {props.data.map(util.fillBar)}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ParTotalsBarChart

