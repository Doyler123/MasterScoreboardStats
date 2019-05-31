import React from 'react';
import PropTypes from 'prop-types';
import TabComponent from './TabComponent'
import { connect } from 'react-redux';
import store from '../../redux/store'
import * as Actions from '../../redux/actions/Actions'
import {ALL} from '../../constants/constants'
import * as util from '../../util/TabsUtil'

class TabsContainer extends React.Component {

  constructor(props) {
    super(props)

    this.initilaiseApp()
    
  }

  initilaiseApp = () => {
    var courseData = util.calculateCourseData(this.props.data[0], null);
    store.dispatch({
      type : Actions.INITIALISE,
      course : 0,
      hole : ALL,
      dateRange : util.getInitialDateRange(courseData.Competitions),
      courseData: courseData
    })
  }

  handleCourseChange = (event, course) => {
    var courseData = util.calculateCourseData(this.props.data[course], null);
    store.dispatch({
      type : Actions.CHANGE_COURSE,
      course: course,
      hole : ALL,
      dateRange : util.getInitialDateRange(courseData.Competitions),
      courseData: courseData
    })
  }

  handleHoleChange = (event, currentHole) => {
    store.dispatch({
      type : Actions.CHANGE_HOLE,
      hole : currentHole
    })
  };

  onDateRangeChange = (dateRange) => {
    store.dispatch({
      type : Actions.CHANGE_DATE_RANGE,
      dateRange : dateRange,
      courseData : util.calculateCourseData(this.props.data[this.props.course], dateRange)
    })
  }

  render() {
    

    return (
      <TabComponent
        data                ={this.props.data}
        course              ={this.props.course}
        currentHole         ={this.props.currentHole}
        dateRange           ={this.props.dateRange}
        courseData          ={this.props.courseData}
        handleCourseChange  ={this.handleCourseChange}
        onDateRangeChange   ={this.onDateRangeChange}
        handleHoleChange    ={this.handleHoleChange}
      />
      
    );
  }
}

TabsContainer.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (store) => {
  return{
    course      : store.course,
    courseData  : store.courseData,
    currentHole : store.hole,
    dateRange   : store.dateRange
  }
}

export default connect(mapStateToProps)(TabsContainer)