import React from 'react';
import PropTypes from 'prop-types';
import calculateCourseData from '../../util/CalculateCourseData'
import TabComponent from './TabComponent'
import {ALL} from '../../constants/constants'



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