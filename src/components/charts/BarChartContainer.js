import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BarChart1 from '../icons/BarChart1'
import BarChart2 from '../icons/BarChart2'
import {ALL} from '../../constants/constants'


const tabWidth = 50

export default class BarChartContainer extends Component{

    constructor(props) {

        super(props);
        this.state = {
            hole : props.hole,
            tab  : 0
        }
    }

    handleTabChange = (event, value) => {
        this.setState({...this.state, 
            tab : value})
    }


    componentWillReceiveProps(newProps) {
        this.setState({
            hole : newProps.hole
        })
    }


    getChart = () => {

        if(this.props.data.length == 1){
            return this.props.data[0]
        }

        if(this.state.tab === 1 && this.state.hole === ALL){
            return this.props.data[1]
        }else{
            return this.props.data[0]
        }
    }


    render(){
        return(
            <div>
                {this.getChart()}
                {(
                this.state.hole === ALL && this.props.data.length > 1
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
