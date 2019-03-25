import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer
} from 'recharts';
import {SCORES_TO_CODES, SCORE_COLOURS} from '../../constants/constants'

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

    getChartData = (course) => {
        var scoreData = {}
        if(course){
            course.Competitions.forEach(comp => {
                comp.Holes.forEach(hole =>{
                    if(hole.Result in scoreData){
                        scoreData[hole.Result] += 1
                    }else{
                        scoreData[hole.Result] = 1
                    }
                })
            });
        }
        var chartData = []
        for (var score in scoreData) {
            if (!scoreData.hasOwnProperty(score) || score === 'N/A') continue;
            chartData.push({
                'score' : score,
                'count' : scoreData[score],
                'code'  : SCORES_TO_CODES[score]
            });
        }
        return chartData.sort(this.sortChartData);
    }

    sortChartData = (a, b) =>{
        if (a.code < b.code)
            return -1;
        if (a.code > b.code)
            return 1;
        return 0;
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
