import React, { Component } from 'react';
import AllHolesBarChart from './AllHolesBarChart'
import {DEFAULT_ALL_HOLES_TAB} from '../../constants/constants'
import { getAllHolesBarChartData } from '../../util/ChartUtil'
import { StateContext, actions } from '../../state'

export default class ScoresBarChart extends Component {

    static contextType = StateContext

    constructor(props) {
        super(props);
        this.state = {
            data : getAllHolesBarChartData(props.data, DEFAULT_ALL_HOLES_TAB),
            tab  : DEFAULT_ALL_HOLES_TAB
        }
    }

    componentWillReceiveProps(newProps) {
        var tab = this.state.tab ? this.state.tab : DEFAULT_ALL_HOLES_TAB 
        this.setState({
            data : getAllHolesBarChartData(newProps.data, tab)
        })
    }

    formatToolTip = (value, name, props) => { 
        return [value > 0 && this.state.tab === DEFAULT_ALL_HOLES_TAB ? "+" + value : value, "Score " ] 
    }

    formatBarLabel = (value, name, props) => { 
        return [value > 0 && this.state.tab === DEFAULT_ALL_HOLES_TAB ? "+" + value : value] 
    }

    handleTabChange = (event, value) => {
        this.setState({ 
            data : getAllHolesBarChartData(this.props.data, value),
            tab  : value
        });
    };

    handleBarClick = (data, index) => {
        const [ state, dispatch ] = this.context
        dispatch({
            type: actions.CHANGE_HOLE,
            newHole: index + 1
        })
    }


    render() {


        return (
        <AllHolesBarChart 
            data                = {this.state.data}
            tab                 = {this.state.tab}
            handleTabChange     = {this.handleTabChange}
            formatToolTip       = {this.formatToolTip}
            formatBarLabel      = {this.formatBarLabel}
            handleBarClick      = {this.handleBarClick}
        />  
        );
    }
}