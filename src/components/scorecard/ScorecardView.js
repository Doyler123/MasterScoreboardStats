import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import EventIcon from '@material-ui/icons/Event';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import { MS_DATE_FORMAT } from '../../constants/constants'  

import './style/scorecard.css';

const useStyles = makeStyles((theme) => ({
    hole: {
        backgroundColor: theme.palette.primary.light,
        color: '#fff',
        padding: '.5em 0',
    },
    points: {
        backgroundColor: '#f3f3f3',
        color: theme.palette.primary.light,
        padding: '.5em 0',
    },
    textField: {
        marginRight: '1em',
        width: '15em',
        marginTop: 0,
        [theme.breakpoints.down('md')]: {
            width: '48%',
            marginRight: '3%'
        },
        '& input':{
            [theme.breakpoints.down('md')]: {
                fontSize: '14px'
            }
        }
    },
    disabledInput:{
        color: theme.palette.text.primary + "!important",
        '&::before': {
            borderBottomStyle: 'solid!important',
        },
        "& input": {
            cursor: 'initial'
        }
    },
    textBox: {
        marginBottom: '2em',
    },
    bottomTextBox: {
        marginTop: '2em',
        "& input": {
            "&::placeholder": {
                fontFamily: theme.typography.fontFamily
            }
        }
    },
    textBoxSmallMargin: {
        marginBottom: '.5em',
    },
    inputRoot:{
        paddingLeft: '10px'
    },
    heading: {
        display: 'flex',
        marginBottom: '10px',
        color: theme.palette.primary.light,
    },
    headingTextContainer: {
        display: 'flex',
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingText:{
        fontSize: '17px',
    },
    headingButtonsContainer: {
        display: 'flex',
        flex: 1
    },
    headingButton: {
        color: theme.palette.primary.light,
        [theme.breakpoints.down('md')]: {
            paddingTop: '0'
        }
    },
    dateIcon: {
        color: '#777777',
        cursor: 'pointer'
    },
    dateIconReadOnly: {
        color: '#777777',
    },
    signature:{
        '& input':{
            paddingLeft: '10px',
            fontFamily: "'Homemade Apple', cursive",
            [theme.breakpoints.down('md')]: {
                height: '2em',
                paddingBottom: '0'
            }
        }
    },
    paper: {
        display: 'inline-block',
        margin: 'auto',
        padding: '20px',
        textAlign: 'center'
    },
    container:{
        padding: '1.5em',
        display: 'inline-block',
        [theme.breakpoints.down('md')]: {
            padding: 0
        }
    },
    loading:{
        width: '32em',
        height: '45em!important',
        [theme.breakpoints.down('md')]: {
            width: '100%'
        }
    }
  }));

  const getScoreClass = (par, score) => {
    if(score && !isNaN(par) && !isNaN(score)){
        let holeScore = parseInt(par) - parseInt(score);
        switch(holeScore){
            case 2:
                return 'eagle';
            case 1:
                return 'birdie';
            case 0:
                return 'par-score';
            case -1:
                return 'bogey';
            case -2:
                return 'dbl-bogey';
            default:
                if(holeScore > 2){
                    return 'eagle';
                }
                else if(holeScore < -2){
                    return 'other-score';
                }
        }  
    }
    return 'other-score';
  }

const ScorecardView = ({cardData, courseData, calculateTotal, readOnly, displayValue}) => {

    const firstScoreRef = useRef(null);
    
    let holeSplit = courseData.Holes.length > 9 ? Math.ceil((courseData.Holes.length / 2)) : 9; 

    const classes = useStyles();

    return(
        <div className={classes.container}>
            <Paper elevation={3} className={classes.paper} >
                {!cardData || !courseData ? 
                
                null

                : 
                
                <React.Fragment>
                    <form>
                        <div className="nine">
                            <div className="line">
                                <span className={classes.hole}>Hole</span>
                                <span className="par">Par</span>
                                <span className="score">Net</span>
                            </div>

                            {courseData.Holes.slice(0, holeSplit).map((hole, index) =>{
                                let holeIndex = index;
                                return( 
                                    <div className="line" key={hole.HoleNumber} >
                                        <span className={classes.hole}>{hole.HoleNumber}</span>
                                        <span className="par">{hole.HolePar}</span>
                                        <span className={readOnly ? `read-only-score ${getScoreClass(hole.HolePar, cardData.Holes[holeIndex].Score)}` : "score"}>
                                            {displayValue(cardData.Holes[holeIndex].Score)}
                                        </span>
                                    </div>
                                )    
                            })}
                            
                            <div className="line">
                                <span className={classes.hole}>Out</span>
                                <span className="par">{displayValue(calculateTotal(courseData.Holes.slice(0, holeSplit), 'HolePar'))}</span>
                                <span className="score">{displayValue(calculateTotal(cardData.Holes.slice(0, holeSplit), 'Score'))}</span>
                            </div>
                            {courseData.Holes.length <= 9 ? 
                                <div className="line">
                                    <span className={classes.hole}>Total</span>
                                    <span className="par">{displayValue(calculateTotal(courseData.Holes, 'HolePar'))}</span>
                                    <span className="score">{displayValue(calculateTotal(cardData.Holes, 'Score'))}</span>
                                </div> 
                            : null}
                        </div>
                        {courseData.Holes.length > 9 ? 
                            <div className="nine" style={{ marginRight: 0}}>
                                <div className="line">
                                    <span className={classes.hole}>Hole</span>
                                    <span className="par">Par</span>
                                    <span className="score">Net</span>
                                </div>

                                {courseData.Holes.slice(holeSplit, courseData.Holes.length).map((hole, index) =>{
                                    let holeIndex = holeSplit + index;
                                    return( 
                                        <div className="line" key={hole.HoleNumber} >
                                            <span className={classes.hole}>{hole.HoleNumber}</span>
                                            <span className="par">{hole.HolePar}</span>
                                            <span className={readOnly ? `read-only-score ${getScoreClass(hole.HolePar, cardData.Holes[holeIndex].Score)}` : "score"}>
                                                {displayValue(cardData.Holes[holeIndex].Score)}
                                            </span>
                                        </div>
                                    )    
                                })}

                                <div className="line">
                                    <span className={classes.hole}>In</span>
                                    <span className="par">{displayValue(calculateTotal(courseData.Holes.slice(holeSplit, courseData.Holes.length), 'HolePar'))}</span>
                                    <span className="score">{displayValue(calculateTotal(cardData.Holes.slice(holeSplit, courseData.Holes.length), 'Score'))}</span>
                                </div>
                                <div className="line">
                                    <span className={classes.hole}>Total</span>
                                    <span className="par">{displayValue(calculateTotal(courseData.Holes, 'HolePar'))}</span>
                                    <span className="score">{displayValue(calculateTotal(cardData.Holes, 'Score'))}</span>
                                </div>
                            </div>
                        : null }
                    </form>
                </React.Fragment>}
            </Paper>
        </div>
    );
};


export default ScorecardView;