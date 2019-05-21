import React from 'react';
import PropTypes from 'prop-types';
import TabComponent from './TabComponent'
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

  handleCourseChange = (event, course) => {

    var courseData = util.calculateCourseData(this.props.data[course], null);

    this.setState({ 
        course,
        courseData : courseData,
        currentHole: ALL,
        dateRange : util.getInitialDateRange(courseData.Competitions)
       });
  }

  handleHoleChange = (event, currentHole) => {
    this.setState({currentHole : currentHole });
  };

  onDateRangeChange = (dateRange) => {
    this.setState({
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

export default TabsContainer