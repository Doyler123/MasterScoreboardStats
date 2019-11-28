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

function Layout(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container justify="space-evenly" alignItems="center" spacing={10}>
        {props.children}
      </Grid>
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);