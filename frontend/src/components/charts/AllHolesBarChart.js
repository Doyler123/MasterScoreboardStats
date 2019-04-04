import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer, Cell
} from 'recharts';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OverUnderIcon from '@material-ui/icons/Exposure';
import EagleIcon from '@material-ui/icons/ExposureNeg2';
import BirdeIcon from '@material-ui/icons/ExposureNeg1';
import ParIcon from '@material-ui/icons/ExposureZero';
import BogeyIcon from '@material-ui/icons/ExposurePlus1';
import DoubleIcon from '@material-ui/icons/ExposurePlus2';
import ScratchIcon from '@material-ui/icons/HighlightOff';

import {SCORES_TO_COLOURS} from '../../constants/constants'

const DEFAULT_TAB = 'TotalToPar'

const tabWidth = 50

export default class ScoresBarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : this.getChartData(props.data, DEFAULT_TAB),
            tab  : DEFAULT_TAB
        }
    }

    componentWillReceiveProps(newProps) {
        var tab = this.state.tab ? this.state.tab : DEFAULT_TAB 
        this.setState({
            data : this.getChartData(newProps.data, this.state.tab)
        })
    }


    getChartData = (data, dataField) =>{
        var chartData = []
        if(data.Holes){
            data.Holes.forEach((hole, index) => {
                chartData.push({
                    "hole" : "Hole " + (index + 1),
                    "total" : hole[dataField] ? hole[dataField] : 0
                })
            });
        }
        return chartData
    }

    formatToolTip = (value, name, props) => { 
        return [value > 0 && this.state.tab === DEFAULT_TAB ? "+" + value : value, "Score " ] 
    }

    formatBarLabel = (value, name, props) => { 
        return [value > 0 && this.state.tab === DEFAULT_TAB ? "+" + value : value] 
    }

    handleTabChange = (event, value) => {
        this.setState({ 
            data : this.getChartData(this.props.data, value),
            tab  : value
        });
      };

    render() {
        return (
        <div>
            <ResponsiveContainer width='100%' aspect={3.0/1.0}>
                <BarChart
                    data={this.state.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="6 6" />
                    <XAxis dataKey="hole"/>
                    <YAxis type="number" domain={[0, 'dataMax + 5']}/>
                    <Tooltip formatter={this.formatToolTip} />
                    <Bar dataKey="total" fill="#8884d8" >
                        {this.state.data.map((entry, index) => {
                            const color = SCORES_TO_COLOURS[this.state.tab]
                            console.log(color)
                            return color ? <Cell fill={color} /> : null;
                        })}
                        <LabelList dataKey="total" position="top" formatter={this.formatBarLabel}/>
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <Tabs
                value={this.state.tab}
                onChange={this.handleTabChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                >
                <Tab icon={<OverUnderIcon />} style={{ minWidth: tabWidth }} value='TotalToPar' label="OVER/UNDER" />
                <Tab icon={<ScratchIcon />} style={{ minWidth: tabWidth }} value='Scratch' label="SCRATCH" />
                <Tab icon={<DoubleIcon />} style={{ minWidth: tabWidth }} value='Double' label="DOUBLE" />
                <Tab icon={<BogeyIcon />} style={{ minWidth: tabWidth }} value='Bogey' label="BOGEY" />
                <Tab icon={<ParIcon />} style={{ minWidth: tabWidth }} value='Par' label="PAR" />
                <Tab icon={<BirdeIcon />} style={{ minWidth: tabWidth }} value='Birde' label="BIRDE" />
                <Tab icon={<EagleIcon />} style={{ minWidth: tabWidth }} value='Eagle' label="EAGLE" />
            </Tabs>
        </div>  
        );
    }
}
