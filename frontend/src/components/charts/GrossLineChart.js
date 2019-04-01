import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import {RESULT_VALUES, ALL} from '../../constants/constants'

export default class GrossLineChart extends Component {

    constructor(props) {
        super(props);
            
        this.state = {
            data: [],
            hole: ALL,
            average: 0
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            data : newProps.data.data,
            hole : newProps.hole,
            average : newProps.data.average
        })
    }

    formatToolTip = (value, name, props) => { return [value > 0 && this.state.hole == ALL ? "+" + value : value, "Score " ] }

    render() {
        return (
        <ResponsiveContainer width='100%' aspect={4.5/3.0}>
            <LineChart
                data={this.state.data}
                margin={{
                top: 5, right: 30, left: 20, bottom: 40,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" minTickGap={1} tick={<CustomizedAxisTick />} />
                <YAxis />
                <ReferenceLine y={this.state.average} label={"Avg: +" + this.state.average.toFixed(1)} stroke="red" strokeDasharray="3 3"/>
                <Tooltip formatter={this.formatToolTip}/>
                <Line connectNulls={true} type="monotone" dataKey="gross" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
        );
      }
}
  
  class CustomizedAxisTick extends Component {
    render() {
      const {
        x, y, stroke, payload,
      } = this.props;
  
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-90)" fontSize={12}>{payload.value}</text>
        </g>
      );
    }
  }

  
