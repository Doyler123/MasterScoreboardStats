import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer
} from 'recharts';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OverUnderIcon from '@material-ui/icons/Exposure';
import EagleIcon from '@material-ui/icons/ExposureNeg2';
import BirdeIcon from '@material-ui/icons/ExposureNeg1';
import ParIcon from '@material-ui/icons/ExposureZero';
import BogeyIcon from '@material-ui/icons/ExposurePlus1';
import DoubleIcon from '@material-ui/icons/ExposurePlus2';
import ScratchIcon from '@material-ui/icons/HighlightOff';


// const ALL_HOLES_TAB_DATA_MAP = {
//     0 : 'TotalToPar',
//     1 : 'Eagle',
//     2 : 'Birde',
//     3 : ''
// }

export default class ScoresBarChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            data : this.getChartData(newProps.data, 'TotalToPar')
        })
    }


    getChartData = (data, dataField) =>{
        var chartData = []
        if(data.Holes){
            data.Holes.forEach((hole, index) => {
                chartData.push({
                    "hole" : "Hole " + (index + 1),
                    "total" : hole.TotalToPar
                })
            });
        }
        return chartData
    }

    formatToolTip = (value, name, props) => { 
        return [value > 0 ? "+" + value : value, "Score " ] 
    }

    formatBarLabel = (value, name, props) => { 
        return [value > 0 ? "+" + value : value] 
    }

    handleTabChange = (event, value) => {
        this.setState({ value });
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
                    <YAxis type="number" />
                    <Tooltip formatter={this.formatToolTip} />
                    <Bar dataKey="total" fill="#8884d8" >
                        <LabelList dataKey="total" position="top" formatter={this.formatBarLabel}/>
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <Tabs
                value={this.state.value}
                onChange={this.handleTabChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                >
                <Tab icon={<OverUnderIcon />} value='TotalToPar' label="OVER/UNDER" />
                <Tab icon={<EagleIcon />} value='Eagle' label="EAGLE" />
                <Tab icon={<BirdeIcon />} value='Birde' label="BIRDE" />
                <Tab icon={<ParIcon />} value='Par' label="PAR" />
                <Tab icon={<BogeyIcon />} value='Bogey' label="BOGEY" />
                <Tab icon={<DoubleIcon />} value='Double' label="DOUBLE" />
                <Tab icon={<ScratchIcon />} value='Scratch' label="SCRATCH" />
            </Tabs>
        </div>  
        );
    }
}
