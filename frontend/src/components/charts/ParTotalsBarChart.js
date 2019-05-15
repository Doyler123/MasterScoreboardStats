import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer
} from 'recharts';

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
                <XAxis dataKey="score"/>
                <YAxis type="number" tickCount={8} domain={[0, 'dataMax + 25']}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="Par 3" fill="#A6D9F7" >
                    <LabelList dataKey="par3" position="top" />
                </Bar>
                <Bar dataKey="Par 4" fill="#84DCCF" >
                    <LabelList dataKey="par4" position="top" />
                </Bar>
                <Bar dataKey="Par 5" fill="#E0DEA8" >
                    <LabelList dataKey="par5" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ParTotalsBarChart

