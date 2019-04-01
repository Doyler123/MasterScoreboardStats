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
            data : this.getChartData(newProps.data)
        })
    }


    getChartData = (data) =>{
        var chartData = []
        if(data.Holes){
            data.Holes.forEach((hole, index) => {
                chartData.push({
                    "hole" : "Hole " + (index + 1),
                    "total" : hole.TotalToPar
                })
            });
        }
        console.log(chartData)
        return chartData
    }

    render() {
        return (
        <ResponsiveContainer width='100%' aspect={4.5/2.0}>
            <BarChart
                data={this.state.data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="6 6" />
                <XAxis dataKey="hole"/>
                <YAxis type="number" />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" >
                    <LabelList dataKey="total" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
        );
    }
}
