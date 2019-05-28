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

    var courseData = util.calculateCourseData(props.data[0], null);

    this.state = {
      course: 0,
      courseData : courseData,
      currentHole: ALL,
      dateRange : util.getInitialDateRange(courseData.Competitions)
    };
  }

  initilaiseApp = () => {

    var courseData = util.calculateCourseData(props.data[0], null);

    store.dispatch({
      type : Actions.INITIALISE,
      course : 0,
      hole : ALL,
      dateRange : util.getInitialDateRange(courseData.Competitions),
      courseData, courseData
    })
  }

  handleCourseChange = (event, course) => {

    var courseData = util.calculateCourseData(this.props.data[course], null);
    this.setState({ 
        course,
        courseData : courseData,
        currentHole: ALL,
        dateRange : util.getInitialDateRange(courseData.Competitions)
       });

    store.dispatch({
      type : Actions.CHANGE_COURSE,
      course: course,
      hole : ALL,
      dateRange : util.getInitialDateRange(courseData.Competitions),
      courseData: courseData
    })
  }

  handleHoleChange = (event, currentHole) => {
    this.setState({currentHole : currentHole });

    store.dispatch({
      type : Actions.CHANGE_HOLE,
      hole : currentHole
    })
  };

  onDateRangeChange = (dateRange) => {
    this.setState({
      courseData : util.calculateCourseData(this.props.data[this.state.course], dateRange),
      dateRange : dateRange
    })

    store.dispatch({
      type : Actions.CHANGE_DATE_RANGE,
      courseData : util.calculateCourseData(this.props.data[this.state.course], dateRange),
      dateRange : dateRange
    })
  }

  render() {
    
    return (
      <TabComponent
        data                ={this.props.data}
        course              ={this.state.course}
        currentHole         ={this.state.currentHole}
        dateRange           ={this.state.dateRange}
        courseData          ={this.state.courseData}
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