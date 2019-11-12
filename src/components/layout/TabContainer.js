import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TabComponent from './TabComponent'
import {ALL} from '../../constants/constants'
import * as courseDataUtil from '../../util/CourseDataUtil'
import { useStateValue, actions } from '../../state'

const TabsContainer = ({ data }) => {

  const [{ course, hole }, dispatch ] = useStateValue();

  const [courseData, setCourseData] = useState(courseDataUtil.calculateCourseData(data[course], null))
  const [dateRange, setDateRange]   = useState(courseDataUtil.getInitialDateRange(courseData.Competitions))

  const setHole = (newHole) => {
    dispatch({
      type: actions.CHANGE_HOLE,
      newHole: newHole
    })
  }
  
  const setCourse = (newCourse) => {
    dispatch({
      type: actions.CHNAGE_COURSE,
      newCourse: newCourse
    })
  }

  const handleCourseChange = (event, newCourse) => {
    setCourse(newCourse)
    setHole(ALL)
    setCourseData(courseDataUtil.calculateCourseData(data[newCourse], null))
    setDateRange(courseDataUtil.getInitialDateRange(courseData.Competitions))
  }

  const handleHoleChange = (event, currentHole) => {
    setHole(currentHole)
  };

  const onDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange)
    setCourseData(courseDataUtil.calculateCourseData(data[course], newDateRange))
  }

    if(!courseData.Competitions){
      return null
    }

    return (
        <TabComponent
          data                = {data}
          course              = {course}
          currentHole         = {hole}
          dateRange           = {dateRange}
          courseData          = {courseData}
          handleCourseChange  = {handleCourseChange}
          onDateRangeChange   = {onDateRangeChange}
          handleHoleChange    = {handleHoleChange}
        />      
    );
}

TabsContainer.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TabsContainer