import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ParTotalsBarChart from './ParTotalsBarChart';
import ScoresBarChart from './ScoresBarChart';
import BarChart1 from '../icons/BarChart1'
import BarChart2 from '../icons/BarChart2'
import {Cell} from 'recharts';
import {SCORES_TO_COLOURS} from '../../constants/constants'
import {ALL} from '../../constants/constants'


const tabWidth = 50

export default class BarChartContainer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data : props.data[0],
            hole : props.hole,
            tab  : 0
        }
    }

    handleTabChange = (event, value) => {
        this.setState({...this.state, 
            data: this.props.data[value], 
            tab : value})
    }


    componentWillReceiveProps(newProps) {
        this.setState({
            data : newProps.data[this.state.tab],
            hole : newProps.hole
        })
    }

    getChart = () => {
        if(this.state.tab === 1 && this.state.hole === ALL){
            return <ParTotalsBarChart fillBar={this.fillBar} data={this.state.data} />
        }else{
            return <ScoresBarChart fillBar={this.fillBar} data={this.state.data} />
        }
    }

    fillBar = (entry) => {
        return <Cell fill={SCORES_TO_COLOURS[entry.score]} />;
    }


    render(){
        return(
            <div>
                {this.getChart()}
                {(
                this.state.hole === ALL
                ? <Tabs
                                    value={this.state.tab}
                                    onChange={this.handleTabChange}
                                    variant="fullWidth"
                                    indicatorColor="secondary"
                                    textColor="secondary"
                                    >
                                    <Tab icon={<BarChart1 />} style={{ minWidth: tabWidth }} value={0} label="TOTALS" />
                                    <Tab icon={<BarChart2 />} style={{ minWidth: tabWidth }} value={1} label="PAR" />
                                </Tabs>
                : null
                )}
            </div>
        )
    }


}
