import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, ResponsiveContainer
} from 'recharts';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

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
        return chartData
    }

    formatToolTip = (value, name, props) => { 
        return [value > 0 ? "+" + value : value, "Score " ] 
    }

    formatBarLabel = (value, name, props) => { 
        return [value > 0 ? "+" + value : value] 
    }

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
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                >
                <Tab icon={<PhoneIcon />} label="RECENTS" />
                <Tab icon={<FavoriteIcon />} label="FAVORITES" />
                <Tab icon={<PersonPinIcon />} label="NEARBY" />
            </Tabs>
        </div>  
        );
    }
}
