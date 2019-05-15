import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer
} from 'recharts';
import {SCORES_TO_COLOURS} from '../../constants/constants'

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
                <XAxis dataKey="score"/>
                <YAxis type="number" tickCount={8} domain={[0, 'dataMax + 25']}/>
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" >
                    {props.data.map((entry, index) => {
                        console.log(entry)
                        const color = SCORES_TO_COLOURS[entry.score]
                        return <Cell fill={color} />;
                    })}
                    <LabelList dataKey="count" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}


export default ScoresBarChart