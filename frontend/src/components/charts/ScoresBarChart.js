import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer
} from 'recharts';
import {SCORES_TO_CODES, SCORE_COLOURS, ALL} from '../../constants/constants'

export default class ScoresBarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            data : newProps.data
        })
    }

    render() {
        return (
        <ResponsiveContainer width='100%' aspect={4.5/3.0}>
            <BarChart
                data={this.state.data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="6 6" />
                <XAxis dataKey="score"/>
                <YAxis type="number" tickCount={8} domain={[0, 'dataMax + 25']}/>
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" >
                    {this.state.data.map((entry, index) => {
                        const color = SCORE_COLOURS[entry.code]
                        return <Cell fill={color} />;
                    })}
                    <LabelList dataKey="count" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
        );
    }
}
