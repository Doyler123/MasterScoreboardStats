import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-default.css';

import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardIcon from "../Card/CardIcon.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardFooter from "../Card/CardFooter.jsx";


import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const CardHeadingText = (props) =>(
  <Typography color='inherit' >
    <b>{props.children}</b>
  </Typography>
)

const StatBarStyle = {
  display: "inlineBlock",
  float: "left",
  width: "85%",
  textAlign: "center",
  borderRight: "1px solid #eee"
}

function StatItem(props) {
  const { classes, title, titleColor, heading, subHeading, stats,   } = props;
  return (
    <Grid item xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} xl={props.xl}>
      <Card>
          <CardHeader color={titleColor} stats icon>
              <CardIcon className="card-icon-heading" color={titleColor}>
              {title.split(" ").map((text)=>(
                <CardHeadingText>{text}</CardHeadingText>
              ))}
              </CardIcon>
              <div style={StatBarStyle}>
              <Grid container>
              <Grid item xs={2}>
                <Typography variant="h6" gutterBottom>
                  {"Worst Hole"}
                </Typography>
                <h3 className={classes.cardTitle}>{heading}</h3>
                <h3 className={classes.cardTitle}>{subHeading}</h3>
              </Grid>
              <Grid item xs={2}>
              <p className={classes.cardTitle}>{heading}</p>
              </Grid>
              <Grid item xs={2}>
              <p className={classes.cardTitle}>{heading}</p>
              </Grid>
              <Grid item xs={2}>
              <p className={classes.cardTitle}>{heading}</p>
              </Grid>
              <Grid item xs={2}>
              <p className={classes.cardTitle}>{heading}</p>
              </Grid>
            </Grid>
              </div>
              {/* <p className={classes.cardCategory}>{heading}</p>
              <h3 className={classes.cardTitle}>{subHeading}</h3> */}
          </CardHeader>
          <CardBody>
            
          </CardBody>
          {/* <CardFooter stats>
              <div className={classes.stats}>
                {stats.map((stat)=>(
                  stat.name + ": " + stat.value
                ))}
              </div>
          </CardFooter> */}
      </Card>
    </Grid>
  );
}

StatItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(StatItem);