import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {ALL, COMBINED} from '../../constants/constants';

const tabWidth = 50;
export default class GrossLineChart extends Component {

    aspect = this.props.large ? 5.5/2.0 : this.props.course === COMBINED ? 5.5/2.7 : 5.5/3.0

    formatToolTip = (value, name, props) => { return [value > 0 && this.props.hole === ALL ? "+" + value : value, "Score " ] }

    getDataMin = dataMin => {
      return dataMin - 3
    }

    getDataMax = dataMax => {
      return dataMax + 3
    }

    handleClick = (compId) => {
      this.props.dispatch({
        type: this.props.actions.SELECT_COMP,
        selectedComp: compId
      })
    }

    render() {

        let {data} = this.props

        return (
          <React.Fragment>
            <ResponsiveContainer width='100%' aspect={this.aspect}>
                <LineChart
                    data={data.comps}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" minTickGap={1} tick={<CustomizedAxisTick />} />
                    <YAxis domain={[this.getDataMin, this.getDataMax]}/>
                    <ReferenceLine y={data.average} label={"Avg: +" + data.average.toFixed(1)} stroke="red" strokeDasharray="3 3"/>
                    <Tooltip formatter={this.formatToolTip}/>
                    <Line dot={false} connectNulls={true} type="monotone" dataKey="gross" stroke="#8884d8" activeDot={{ r: 8, onClick: (event, payload) => this.handleClick(event.payload.date), cursor: "pointer"}} />
                </LineChart>
            </ResponsiveContainer>
            {this.props.course === COMBINED ? 
              <Tabs
                  value={this.props.tab}
                  onChange={this.props.handleTabChange}
                  variant="fullWidth"
                  indicatorColor="secondary"
                  textColor="secondary"
                  >
                  {this.props.tabs.map((tab, index) => <Tab key={index + tab} style={{ minWidth: tabWidth }} value={tab} label={`${tab} Holes (${this.props.chartData[tab].comps.length})`} />)}
              </Tabs> 
            : null}
          </React.Fragment>
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
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666" fontSize={10}>{payload.value}</text>
        </g>
      );
    }
  }

  
