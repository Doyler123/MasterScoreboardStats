import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import {ALL} from '../../constants/constants'

export default class GrossLineChart extends Component {


    formatToolTip = (value, name, props) => { return [value > 0 && this.props.hole === ALL ? "+" + value : value, "Score " ] }

    render() {

        let {data} = this.props

        if(!data){
          return null
        }
        return (
        <ResponsiveContainer width='100%' aspect={5.5/3.0}>
            <LineChart
                data={data.data}
                margin={{
                top: 5, right: 30, left: 20, bottom: 40,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" minTickGap={1} tick={<CustomizedAxisTick />} />
                <YAxis domain={['dataMin - 3', 'dataMax + 3']}/>
                <ReferenceLine y={data.average} label={"Avg: +" + data.average.toFixed(1)} stroke="red" strokeDasharray="3 3"/>
                <Tooltip formatter={this.formatToolTip}/>
                <Line dot={false} connectNulls={true} type="monotone" dataKey="gross" stroke="#8884d8" activeDot={{ r: 8 }} />
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

  
