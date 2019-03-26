import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, ResponsiveContainer
} from 'recharts';
import {SCORES_TO_CODES, SCORE_COLOURS, ALL} from '../../constants/constants'

export default class ParTotalsBarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            data : this.getChartData(newProps.data, newProps.hole),
        })
    }

    getChartData = (course, currentHole) => {
        var scoreData = {}
        if(course){
            course.Competitions.forEach(comp => {
                comp.Holes.forEach((hole, index) =>{
                    if(currentHole === ALL || hole.Number === currentHole){
                        var par = course.CourseInfo.Holes[index].Par
                        if(hole.Result in scoreData){
                            if(par in scoreData[hole.Result]){
                                scoreData[hole.Result][par] += 1
                            }else{
                                scoreData[hole.Result][par] = 1
                            }
                        }else{
                            scoreData[hole.Result]= {[par]: 1}
                        }
                    }
                })
            });
        }
        console.log(scoreData)
        var chartData = []
        for (var score in scoreData) {
            if (!scoreData.hasOwnProperty(score) || score === 'N/A') continue;
            chartData.push({
                'score' : score,
                'par3' : scoreData[score][3] ? scoreData[score][3] : 0,
                'par4' : scoreData[score][4] ? scoreData[score][4] : 0,
                'par5' : scoreData[score][5] ? scoreData[score][5] : 0,
                'code'  : SCORES_TO_CODES[score]
            });
        }
        console.log(chartData)
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
                <Legend />
                <Bar dataKey="par3" fill="#A6D9F7" >
                    {/* {this.state.data.map((entry, index) => {
                        const color = SCORE_COLOURS[entry.code]
                        return <Cell fill={color} />;
                    })} */}
                    <LabelList dataKey="par3" position="top" />
                </Bar>
                <Bar dataKey="par4" fill="#84DCCF" >
                    {/* {this.state.data.map((entry, index) => {
                        const color = SCORE_COLOURS[entry.code]
                        return <Cell fill={color} />;
                    })} */}
                    <LabelList dataKey="par4" position="top" />
                </Bar>
                <Bar dataKey="par5" fill="#E0DEA8" >
                    {/* {this.state.data.map((entry, index) => {
                        const color = SCORE_COLOURS[entry.code]
                        return <Cell fill={color} />;
                    })} */}
                    <LabelList dataKey="par5" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
        );
    }
}
