import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function GridItem(props) {
  const { classes } = props;

  return (
    // <Grid item xs={12} sm={6}>
    <Grid item xs={props.xs} sm={props.sm}>
        <Paper className={classes.paper}>
            {props.children}
        </Paper>
    </Grid>
  );
}

GridItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridItem);