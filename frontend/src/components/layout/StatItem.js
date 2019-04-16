import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-default.css';


const styles = theme => ({
  cardHeader: {
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main
  },
  titleStyle: {
    color : theme.palette.primary.contrastText
  }
});

function StatItem(props) {
  const { classes, heading, subHeading, value, valueFormat,  } = props;

  return (
    <Grid item xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.xl}>
      {props.children}
      {/* <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={heading}
          titleTypographyProps={{className : classes.titleStyle}}
          subheader={subHeading}
          subheaderTypographyProps={{className : classes.titleStyle}}
        />
        <CardContent>
          <Typography component="h4" variant="display1" >
              <Odometer value={value ? value : 0} duration={3000} format={valueFormat} />
          </Typography>
        </CardContent>
      </Card> */}
    </Grid>
  );
}

StatItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatItem);