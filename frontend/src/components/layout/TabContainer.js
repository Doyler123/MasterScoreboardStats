import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DatePicker from '../misc/DatePicker'

import CourseDataGrid from './CourseDataGrid'

import calculateCourseData from '../../util/CalculateCourseData'

import {ALL} from '../../constants/constants'

const TabLabel = (props) => (
  <div>
    <Typography variant="body2">
      {"Hole " + props.number}
    </Typography>
    <Typography variant="caption">
      {"Par " + props.par}
    </Typography>
  </div>
)


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3,  backgroundColor: '#EEEEEE' }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
});

class TabsContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      course: 0,
      courseData : calculateCourseData(this.props.data[0], null),
      currentHole: ALL,
      dateRange : null
    };
  }

  componentWillReceiveProps(newProps) {

    var courseData = calculateCourseData(newProps.data[0], this.state.dateRange);
    
    this.setState({
      courseData : courseData,
      dateRange: this.getInitialDateRange(courseData.Competitions)
    })
  }

  handleCourseChange = (event, course) => {

    var courseData = calculateCourseData(this.props.data[course], null);

    this.setState({ 
        course,
        courseData : courseData,
        currentHole: ALL,
        dateRange : this.getInitialDateRange(courseData.Competitions)
       });
  }

  handleHoleChange = (event, currentHole) => {
    this.setState({currentHole : currentHole });
  };

  getCourseName = (text) => {
    return text.replace("<br>Played at ", "")
  }

  getInitialDateRange = (comps) =>{
    if(comps.length < 1){
      return null
    }

    return [
      comps[comps.length - 1].Date,
      comps[0].Date
    ]
  }

  onDateRangeChange = (dateRange) => {
    this.setState({
      courseData : calculateCourseData(this.props.data[this.state.course], dateRange),
      dateRange : dateRange
    })
  }

  render() {
    const { classes, data} = this.props;
    const { course, currentHole } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Grid container>
            <Grid item sm={8}>
              <Tabs value={course} onChange={this.handleCourseChange}>
                {data.map((course, index)=>{
                  return <Tab value={index} label={this.getCourseName(course.Name)}/>  
                })}
              </Tabs>
            </Grid>
            <Grid item sm={4}>
              <DatePicker
                dateRange={this.state.dateRange}
                onChange={this.onDateRangeChange} />
            </Grid>
          </Grid>
        </AppBar>
        <TabContainer>
          <AppBar position="static" color="default">
            <Tabs
              value={currentHole}
              onChange={this.handleHoleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab value={ALL} label={ALL} />
              {data.length > 0 ? data[this.state.course].CourseInfo.Holes.map((hole, index) => {
                return <Tab value={hole.Number} label={<TabLabel number={hole.Number} par={hole.Par}/>} />
              }) : null}
            </Tabs>
          </AppBar>
          <CourseDataGrid data={this.state.courseData} hole={currentHole}/>
        </TabContainer>
      </div>
    );
  }
}

TabsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabsContainer);