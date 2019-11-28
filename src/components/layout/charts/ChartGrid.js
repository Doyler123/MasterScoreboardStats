import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 20
  }
});

function ChartGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container justify="space-evenly" alignItems="center" spacing={2}>
        {props.children}
      </Grid>
    </div>
  );
}

ChartGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartGrid);