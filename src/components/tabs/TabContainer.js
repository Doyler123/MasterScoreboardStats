import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TabComponent from './TabComponent'
import {ALL, COMBINED} from '../../constants/constants'
import * as courseDataUtil from '../../util/CourseDataUtil'
import { useStateValue, actions } from '../../state'
import NoDataDialog from '../misc/NoDataDialog'

const TabsContainer = ({ data }) => {

  if(!data || data.length === 0){
    return <NoDataDialog 
      open={true}
    />
  }


  const [{ course, hole, selectedComp, scorecardOpen }, dispatch ] = useStateValue();

  const [combinedCourseData, setCombinedCourseData] = useState([]);
  const [courseData, setCourseData] = useState(courseDataUtil.calculateCourseData(data[course], null))
  const [dateRange, setDateRange]   = useState(courseDataUtil.getInitialDateRange(courseData.Competitions))
  
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogDate, setDialogDate] = useState(null)

  const [scorecardDialogOpen, setScorecardDialogOpen] = useState(false)

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

    if (newCourse === COMBINED) {
      let newcombined = data.map(c => courseDataUtil.calculateCourseData(c, null));
      setCombinedCourseData(newcombined);
      setDateRange(courseDataUtil.getInitialDateRange(newcombined.flatMap(c => c.Competitions)))
    } else {
      let newCourseData = courseDataUtil.calculateCourseData(data[newCourse], null);
      setCourseData(newCourseData);
      setDateRange(courseDataUtil.getInitialDateRange(newCourseData.Competitions))
    }

  }

  const handleHoleChange = (event, currentHole) => {
    setHole(currentHole)
  };

  const onDateRangeChange = (newDateRange) => {
    let newData;

    if(course === COMBINED){
      newData = data.map(c => courseDataUtil.calculateCourseData(c, newDateRange)).filter(courseData => courseData.Competitions.length > 0);
    }else{
      newData = courseDataUtil.calculateCourseData(data[course], newDateRange)
    }

    if(course === COMBINED && newData && newData.length > 0){
      setDateRange(newDateRange)
      setCombinedCourseData(newData)
    }
    else if(course !== COMBINED && newData && newData.Competitions.length > 0){
      setDateRange(newDateRange)
      setCourseData(newData)
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
            data                    = {data}
            course                  = {course}
            currentHole             = {hole}
            currentCourse           = {course}
            dateRange               = {dateRange}
            courseData              = {courseData}
            handleCourseChange      = {handleCourseChange}
            onDateRangeChange       = {onDateRangeChange}
            handleHoleChange        = {handleHoleChange}
            combinedCourseData      = {combinedCourseData}
            scorecardOpen           = {scorecardOpen}
            selectedComp            = {selectedComp}
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