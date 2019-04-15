import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


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
  const { classes } = props;

  return (
    <Grid item xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.xl}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title="Best Hole"
          titleTypographyProps={{className : classes.titleStyle}}
          subheader="Hole 18"
          subheaderTypographyProps={{className : classes.titleStyle}}
        />
        <CardContent>
          <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

StatItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatItem);