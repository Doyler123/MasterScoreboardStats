import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import EventIcon from '@material-ui/icons/Event';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

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

const ScorecardView = ({cardData, courseData, setDate, updateScore, calculateTotal, onFocus, handleEnter, onBlurScore, readOnly, displayValue}) => {

    const firstScoreRef = useRef(null);

    useLayoutEffect(() => {
        if(firstScoreRef.current && !readOnly){
            firstScoreRef.current && firstScoreRef.current.focus();
        }
    }, [firstScoreRef.current])

    const classes = useStyles();

    return(
        <div className={classes.container}>
            <Paper elevation={3} className={classes.paper} >
                {!cardData || !courseData ? 
                
                null

                : 
                
                <React.Fragment>
                    <Box className={classes.heading}>
                        <div className={classes.headingButtonsContainer}>
                            
                        </div>
                        <div className={classes.headingTextContainer}>
                            <Typography className={classes.headingText} variant="button" gutterBottom>
                                {courseData.name}
                            </Typography>
                        </div>
                        <div className={classes.headingButtonsContainer}>
                            
                        </div>
                    </Box>
                    <form>
                        <Box className={classes.textBoxSmallMargin}>
                            <TextField
                                disabled
                                className={classes.textField}
                                placeholder="Player Name"
                                value={cardData.player}
                                InputProps={{
                                    readOnly: true,
                                    className: classes.disabledInput,
                                    style:{
                                        cursor: 'text!important',
                                        paddingLeft: '10px'
                                    }
                                }}
                            />
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DatePicker
                                    disabled={!!readOnly}
                                    readOnly={readOnly}
                                    style={{ marginRight: 0}}
                                    className={classes.textField}
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format={'DD/MM/YYYY'}
                                    value={moment(cardData.date)}
                                    onChange={newDate => setDate(newDate)}
                                    InputProps={{
                                        className: !!readOnly ? classes.disabledInput : '',
                                        endAdornment: <InputAdornment position={'end'}><EventIcon className={!!readOnly ? classes.dateIconReadOnly : classes.dateIcon}/></InputAdornment>, 
                                        readOnly: true,
                                        style:{
                                            paddingLeft: '10px'
                                        }
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Box>
                        <Box className={classes.textBox}>
                            <TextField
                                disabled
                                className={classes.textField}
                                placeholder="Competition"
                                value={cardData.competition}
                                InputProps={{
                                    className: classes.disabledInput,
                                    readOnly: true,
                                    style:{
                                        paddingLeft: '10px'
                                    }
                                }}
                            />
                            <TextField
                                disabled
                                style={{ marginRight: 0}}
                                className={classes.textField}
                                value={cardData.handicap}
                                placeholder={'0'}
                                type="number"
                                InputProps={{
                                    className: classes.disabledInput,
                                    readOnly: true,
                                    startAdornment: <InputAdornment position="start">Hcap:</InputAdornment>,
                                    style:{
                                        paddingLeft: '10px'
                                    }
                                }} />
                        </Box>
                        <div className="nine">
                            <div className="line">
                                <span className={classes.hole}>Hole</span>
                                <span className="par">Par</span>
                                <span className="index">Index</span>
                                <span className="score">Net</span>
                                <span className={classes.points}>S/F</span>
                            </div>

                            {courseData.holes.slice(0, 9).map((hole, index) =>{
                                let holeIndex = hole.hole - 1;
                                return( 
                                    <div className="line" key={hole.hole} >
                                        <span className={classes.hole}>{hole.hole}</span>
                                        <span className="par">{hole.par}</span>
                                        <span className="index">{hole.index}</span>
                                        <span className={readOnly ? `read-only-score ${getScoreClass(hole.par, cardData.scores[holeIndex].strokes)}` : "score"}>
                                            <input
                                                ref={ref => {
                                                    if(!firstScoreRef.current && !cardData.scores[holeIndex].strokes && cardData.scores[holeIndex].strokes !== 0){
                                                        firstScoreRef.current = ref;
                                                    }
                                                }}
                                                readOnly={readOnly}
                                                onKeyDown={handleEnter} 
                                                onFocus={onFocus} 
                                                value={displayValue(cardData.scores[holeIndex].strokes, true)} 
                                                type="number" 
                                                className={readOnly ? `read-only-score-box` : "score-box"} 
                                                onBlur={onBlurScore}
                                                onChange={(event) => updateScore(event, (holeIndex), event.target.value)}/>
                                        </span>
                                        <span className={classes.points}>{displayValue(cardData.scores[holeIndex].points)}</span>
                                    </div>
                                )    
                            })}
                            
                            <div className="line">
                                <span className={classes.hole}>Out</span>
                                <span className="par">{displayValue(calculateTotal(courseData.holes.slice(0, 9), 'par'))}</span>
                                <span className="index">&nbsp;</span>
                                <span className="score">{displayValue(calculateTotal(cardData.scores.slice(0, 9), 'strokes'))}</span>
                                <span className={classes.points}>{displayValue(calculateTotal(cardData.scores.slice(0, 9), 'points'))}</span>
                            </div>
                        </div>
                        <div className="nine" style={{ marginRight: 0}}>
                            <div className="line">
                                <span className={classes.hole}>Hole</span>
                                <span className="par">Par</span>
                                <span className="index">Index</span>
                                <span className="score">Net</span>
                                <span className={classes.points}>S/F</span>
                            </div>

                            {courseData.holes.slice(9, 18).map((hole, index) =>{
                                let holeIndex = hole.hole - 1;
                                return( 
                                    <div className="line" key={hole.hole} >
                                        <span className={classes.hole}>{hole.hole}</span>
                                        <span className="par">{hole.par}</span>
                                        <span className="index">{hole.index}</span>
                                        <span className={readOnly ? `read-only-score ${getScoreClass(hole.par, cardData.scores[holeIndex].strokes)}` : "score"}>
                                            <input
                                                ref={ref => {
                                                    if(!firstScoreRef.current && !cardData.scores[holeIndex].strokes && cardData.scores[holeIndex].strokes !== 0){
                                                        firstScoreRef.current = ref;
                                                    }
                                                }}
                                                readOnly={readOnly}
                                                onKeyDown={handleEnter} 
                                                onFocus={onFocus} 
                                                value={displayValue(cardData.scores[holeIndex].strokes, true)} 
                                                type="number" 
                                                className={readOnly ? "read-only-score-box" : "score-box"}
                                                onBlur={onBlurScore} 
                                                onChange={(event) => updateScore(event, (holeIndex), event.target.value)}/>
                                        </span>
                                        <span className={classes.points}>{displayValue(cardData.scores[holeIndex].points)}</span>
                                    </div>
                                )    
                            })}

                            <div className="line">
                                <span className={classes.hole}>In</span>
                                <span className="par">{displayValue(calculateTotal(courseData.holes.slice(9, 18), 'par'))}</span>
                                <span className="index">&nbsp;</span>
                                <span className="score">{displayValue(calculateTotal(cardData.scores.slice(9, 18), 'strokes'))}</span>
                                <span className={classes.points}>{displayValue(calculateTotal(cardData.scores.slice(9, 18), 'points'))}</span>
                            </div>
                            <div className="line">
                                <span className={classes.hole}>Total</span>
                                <span className="par">{displayValue(calculateTotal(courseData.holes, 'par'))}</span>
                                <span className="index">&nbsp;</span>
                                <span className="score">{displayValue(calculateTotal(cardData.scores, 'strokes'))}</span>
                                <span className={classes.points}>{displayValue(calculateTotal(cardData.scores, 'points'))}</span>
                            </div>
                        </div>
                    </form>
                </React.Fragment>}
            </Paper>
        </div>
    );
};


export default ScorecardView;