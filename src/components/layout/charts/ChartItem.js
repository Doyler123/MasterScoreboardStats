import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight : '300px'
  },
});

function ChartItem(props) {
  const { classes } = props;

  return (
    <Grid item xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.xl}>
        <Paper className={classes.paper}>
            {props.children}
        </Paper>
    </Grid>
  );
}

ChartItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartItem);