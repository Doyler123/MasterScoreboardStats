import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import CourseDataGrid from '../CourseDataGrid'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
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
  },
});

class TabsWrappedLabel extends React.Component {
  state = {
    course: 0,
    currentHole: "all"
  };

  handleCourseChange = (event, course) => {
    this.setState({ course, currentHole: "all" });
  }

  handleHoleChange = (event, currentHole) => {
    this.setState({currentHole : currentHole });
  };

  getCourseName = (text) => {
    return text.replace("<br>Played at ", "")
  }

  render() {
    const { classes, data} = this.props;
    const { course, currentHole } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={course} onChange={this.handleCourseChange}>
            {data.map((course, index)=>{
              return <Tab value={index} label={this.getCourseName(course.Name)}/>  
            })}
          </Tabs>
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
              <Tab value={"all"} label={"All"} />
              {data.length > 0 ? data[this.state.course].CourseInfo.Holes.map((hole, index) => {
                return <Tab value={hole.Number} label={"Hole " + hole.Number} />
              }) : null}
            </Tabs>
          </AppBar>
          <CourseDataGrid data={data[this.state.course]} hole={currentHole}/>
        </TabContainer>
      </div>
    );
  }
}

TabsWrappedLabel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabsWrappedLabel);