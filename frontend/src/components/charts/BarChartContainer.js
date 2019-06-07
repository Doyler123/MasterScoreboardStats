import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OverUnderIcon from '@material-ui/icons/Exposure';
import ScratchIcon from '@material-ui/icons/HighlightOff';
import ParTotalsBarChart from './ParTotalsBarChart';
import ScoresBarChart from './ScoresBarChart';
import BarChart1 from '../icons/BarChart1'
import BarChart2 from '../icons/BarChart2'

const tabWidth = 50

export default class BarChartContainer extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data : props.data[0],
            tab  : 0
        }
    }

    handleTabChange = (event, value) => {
        this.setState({...this.state, 
            data: this.props.data[value], 
            tab : value})
    }

    getChart = () => {
        if(this.state.tab === 1){
            return <ParTotalsBarChart data={this.state.data} />
        }else{
            return <ScoresBarChart data={this.state.data} />
        }
    }


    render(){
        return(
            <div>
                {this.getChart()}
                <Tabs
                    value={this.state.tab}
                    onChange={this.handleTabChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    >
                    <Tab icon={<BarChart1 />} style={{ minWidth: tabWidth }} value={0} label="TOTALS" />
                    <Tab icon={<BarChart2 />} style={{ minWidth: tabWidth }} value={1} label="PAR" />
                </Tabs>
            </div>
        )
    }


}
