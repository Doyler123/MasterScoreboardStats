import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TabComponent from './TabComponent'
import {ALL} from '../../constants/constants'
import * as util from '../../util/TabsUtil'

const TabsContainer = ({ data }) => {

  const [course, setCourse]         = useState(0)
  const [hole, setHole]             = useState(ALL)
  const [courseData, setCourseData] = useState(util.calculateCourseData(data[course], null))
  const [dateRange, setDateRange]   = useState(util.getInitialDateRange(courseData.Competitions))


  const handleCourseChange = (event, newCourse) => {
    setCourse(newCourse)
    setHole(ALL)
    setCourseData(util.calculateCourseData(data[newCourse], null))
    setDateRange(util.getInitialDateRange(courseData.Competitions))
  }

  const handleHoleChange = (event, currentHole) => {
    setHole(currentHole)
  };

  const onDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange)
    setCourseData(util.calculateCourseData(data[course], newDateRange))
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