import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {SCORES, SCORES_TO_COLOURS} from '../../constants/constants';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const BirdieCheckBox = withStyles({
    root: {
      color: SCORES_TO_COLOURS[SCORES.BIRDIE],
      '&$checked': {
        color: SCORES_TO_COLOURS[SCORES.BIRDIE],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const ParCheckBox = withStyles({
    root: {
      color: SCORES_TO_COLOURS[SCORES.PAR],
      '&$checked': {
        color: SCORES_TO_COLOURS[SCORES.PAR],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const BogeyCheckBox = withStyles({
    root: {
      color: SCORES_TO_COLOURS[SCORES.BOGEY],
      '&$checked': {
        color: SCORES_TO_COLOURS[SCORES.BOGEY],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const BogeyPlusCheckBox = withStyles({
    root: {
      color: SCORES_TO_COLOURS[SCORES.SCRATCH],
      '&$checked': {
        color: SCORES_TO_COLOURS[SCORES.SCRATCH],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const tabWidth = 50;
export default class GrossLineChart extends Component {

    aspect = 5.5/2.0

    constructor(props) {
        super(props);
        this.state = {
            'birdies'   : true,
            'pars'      : true,
            'bogeys'    : true,
            'bogeys+'   : true
        }
    }

    getDataMin = dataMin => {
      return dataMin - 1
    }

    getDataMax = dataMax => {
      return dataMax + 1
    }
    handleChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };

    render() {

        let {data} = this.props

        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{flex: 1}}>
                    <ResponsiveContainer width='100%' aspect={this.aspect}>
                        <LineChart
                            data={data}
                            margin={{
                            top: 5, right: 30, left: 20, bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" minTickGap={1} tick={<CustomizedAxisTick />} />
                            <YAxis minTickGap={1} allowDecimals={false} tickCount={18} domain={[this.getDataMin, this.getDataMax]}/>
                            <Tooltip />
                            {this.state.birdies && <Line animationDuration={false} dot={false} strokeWidth={2} connectNulls={true} type="basis" dataKey="birdies" stroke={SCORES_TO_COLOURS[SCORES.BIRDIE]} />}
                            {this.state.pars && <Line isAnimationActive={false} dot={false} strokeWidth={2} connectNulls={true} type="basis" dataKey="pars" stroke={SCORES_TO_COLOURS[SCORES.PAR]} />}
                            {this.state.bogeys && <Line isAnimationActive={false} dot={false} strokeWidth={2} connectNulls={true} type="basis" dataKey="bogeys" stroke={SCORES_TO_COLOURS[SCORES.BOGEY]} />}
                            {this.state["bogeys+"] && <Line isAnimationActive={false} dot={false} strokeWidth={2} connectNulls={true} type="basis" dataKey="bogeys+" stroke={SCORES_TO_COLOURS[SCORES.SCRATCH]} />}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <FormControl component="fieldset">
                        <FormGroup>
                            <FormControlLabel
                                control={<BirdieCheckBox checked={this.state.birdies} onChange={this.handleChange} name="birdies" />}
                                label="Birdies"
                            />
                            <FormControlLabel
                                control={<ParCheckBox checked={this.state.pars} onChange={this.handleChange} name="pars" />}
                                label="Pars"
                            />
                            <FormControlLabel
                                control={<BogeyCheckBox checked={this.state.bogeys} onChange={this.handleChange} name="bogeys" />}
                                label="Bogeys"
                            />
                            <FormControlLabel
                                control={<BogeyPlusCheckBox checked={this.state['bogeys+']} onChange={this.handleChange} name="bogeys+" />}
                                label="Bogeys+"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
            </div>
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

  
