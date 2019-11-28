import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'odometer/themes/odometer-theme-default.css';

import Card from "../../Card/Card.jsx";
import CardHeader from "../../Card/CardHeader.jsx";
import CardIcon from "../../Card/CardIcon.jsx";
import CardBody from "../../Card/CardBody.jsx";
import GolfHoleIcon from '../../icons/GolfHoleIcon'


import dashboardStyle from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

function StatItem(props) {
  const { classes, title, titleColor, body } = props;
  return (
    <Grid item xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.xl} >
      <Card>
          <CardHeader color={titleColor} stats icon>
              <CardIcon className="card-icon-heading" color={titleColor}>
                <GolfHoleIcon></GolfHoleIcon>
              </CardIcon>
              {/* <p className={classes.cardCategory}>{title}</p> */}
              <h3 className={classes.cardTitle}>{title}</h3>
          </CardHeader>
          <CardBody>
          <Typography className={classes.cardBodyTypography} variant="h5" >
            {body}
          </Typography>
          </CardBody>
      </Card>
    </Grid>
  );
}

StatItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(StatItem);