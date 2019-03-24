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
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  getCourseName = (text) => {
    return text.replace("<br>Played at ", "")
  }

  render() {
    const { classes, data} = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            {data.map((course, index)=>{
              return <Tab value={index} label={this.getCourseName(course.Name)}/>  
            })}
          </Tabs>
        </AppBar>
        <TabContainer>
          <CourseDataGrid data={data[this.state.value]}/>
        </TabContainer>
      </div>
    );
  }
}

TabsWrappedLabel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabsWrappedLabel);