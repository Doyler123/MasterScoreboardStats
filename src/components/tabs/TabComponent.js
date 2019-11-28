import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import DatePicker from '../misc/DatePicker'
import CourseDataGrid from '../layout/DataGrid'
import {ALL} from '../../constants/constants'
import AppBarSpacer from '../misc/AppBarSpacer'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  dateRange: {
    height: '100%',
    fontSize: '16px'
  }
}))

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
  
  
  const  TabContainer = (props) =>{
    return (
      <Typography component="div" style={{ padding: 8 * 3,  backgroundColor: '#EEEEEE' }}>
        {props.children}
      </Typography>
    );
  }

  const getCourseName = (text) => {
    return text.replace("<br>Played at ", "")
  }


const TabComponent = (props)=> {

    const classes = useStyles()

    let { data,
          course, 
          currentHole, 
          dateRange, 
          courseData, 
          handleCourseChange, 
          onDateRangeChange, 
          handleHoleChange } = props

    return(
        <div className={classes.root}>
        <AppBar position="absolute">
          <Grid container>
            <Grid item sm={8}>
              <Tabs 
                value={course} 
                onChange={handleCourseChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {data.map((course, index)=>{
                  return <Tab value={index} label={getCourseName(course.Name)}/>  
                })}
              </Tabs>
            </Grid>
            <Grid item sm={4}>
              <Grid container direction={'column'} justify={'center'} className={classes.dateRange}>
                <DatePicker
                  dateRange={dateRange}
                  onChange={onDateRangeChange} />
              </Grid>
            </Grid>
          </Grid>
        </AppBar>
        <TabContainer>
          <AppBarSpacer />      
          <AppBar position="static" color="default">
            <Tabs
              value={currentHole}
              onChange={handleHoleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab value={ALL} label={ALL} />
              {data.length > 0 ? data[course].CourseInfo.Holes.map((hole, index) => {
                return <Tab value={hole.Number} label={<TabLabel number={hole.Number} par={hole.Par}/>} />
              }) : null}
            </Tabs>
          </AppBar>
          <CourseDataGrid courseData={courseData} hole={currentHole}/>
        </TabContainer>
      </div>
    )

}

export default TabComponent