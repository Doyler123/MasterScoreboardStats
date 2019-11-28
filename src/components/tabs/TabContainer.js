import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TabComponent from './TabComponent'
import {ALL} from '../../constants/constants'
import * as courseDataUtil from '../../util/CourseDataUtil'
import { useStateValue, actions } from '../../state'
import NoDataDialog from '../misc/NoDataDialog'

const TabsContainer = ({ data }) => {

  if(!data || data.length === 0){
    return <NoDataDialog 
      open={true}
    />
  }

  const [{ course, hole }, dispatch ] = useStateValue();

  const [courseData, setCourseData] = useState(courseDataUtil.calculateCourseData(data[course], null))
  const [dateRange, setDateRange]   = useState(courseDataUtil.getInitialDateRange(courseData.Competitions))
  
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogDate, setDialogDate] = useState(null)

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDateRange(dialogDate)
  };

  const openDialog = () => {
    setDialogOpen(true)
    setDialogDate(dateRange)
  };

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

    let newData = courseDataUtil.calculateCourseData(data[course], newDateRange)

    if(newData.Competitions.length > 0){
      setDateRange(newDateRange)
      setCourseData(courseDataUtil.calculateCourseData(data[course], newDateRange))
    }else{
      openDialog()
      setDateRange(newDateRange)
    }

  }

    if(!courseData.Competitions){
      return null
    }

    return (
      <React.Fragment>
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

          <NoDataDialog 
            open={dialogOpen}
            handleClose={handleDialogClose}
            date={dateRange}
          />

      </React.Fragment>      
    );
}

TabsContainer.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TabsContainer