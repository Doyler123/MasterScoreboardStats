import React, { useEffect, useRef } from 'react';
import ScorecardView from './ScorecardView';
import {luttrellstown} from './courses/luttrellstown'
import moment from 'moment';
import { calculateTotal, calculatePoints } from './calculationsUtil';


const Scorecard = ({cardData, setCardData, readOnly, saveScore}) => {

    const targetRef = useRef();
    const valueRef = useRef();

    const changed = useRef(false);

    const isReadOnly = useRef(readOnly ? true : false);

    const courseData = useRef(luttrellstown);

    useEffect(() => {
        if(!cardData.scores){
            document.activeElement.blur();
            setCardData({
                ...cardData,
                date: moment(),
                handicap: !cardData.handicap ? 0 : cardData.handicap,
                totalStrokes: 0,
                totalPoints: 0,
                scores: courseData.current.holes.map(hole => {return {strokes: null, points: null}})
            })
        }
    }, [])

    useEffect(() => {
        if(targetRef.current && (valueRef.current || valueRef.current === 0) && valueRef.current !== 1){
            goToNextInput(null ,targetRef.current);
        }
    }, [cardData.scores])

    useEffect(() => {
        if(cardData && cardData.scores && cardData.scores.length > 0 && cardData.handicap && setCardData){
            recalculateScores()
        }
    }, [cardData.handicap])

    const setHandicap = (hcap) => {
        setCardData({
            ...cardData,
            handicap: hcap
        })
    }

    const setDate = (date) => {
        setCardData({
            ...cardData,
            date: date
        })
    }

    const setMSignature = (sig) => {
        setCardData({
            ...cardData,
            markersSignature: sig
        })
    }

    const setPSignature = (sig) => {
        setCardData({
            ...cardData,
            playersSignature: sig
        })
    }

    const onBlurScore = (e) => {
        if(changed.current){
            changed.current = false;
            cardData.totalStrokes = calculateTotal(cardData.scores, 'strokes');
            cardData.totalPoints = calculateTotal(cardData.scores, 'points');
            saveScore();
        }
    }

    const updateScore = (event, holeIndex, holeScore) => {
        let parsedScore = !isNaN(holeScore) ? holeScore === '' ? null : parseInt(holeScore) : 0;
        parsedScore = parsedScore < 0 ? 0 : parsedScore;
        if(parsedScore !== cardData.scores[holeIndex].strokes){
            changed.current = true;
            setCardData({
                ...cardData,
                scores: cardData.scores.map((score, index) => holeIndex === index ? {strokes: parsedScore, points: calculatePoints(parsedScore, courseData.current.holes[holeIndex].par, courseData.current.holes[holeIndex].index, cardData.handicap)} : score)
            });
            targetRef.current = event.target;
            valueRef.current = parsedScore;
        }else if(parsedScore !== 1){
            goToNextInput(event);
        }
    }

    const recalculateScores = (e) => {
        let newScores = cardData.scores.map((score, index) => {return {strokes: score.strokes, points: calculatePoints(score.strokes, courseData.current.holes[index].par, courseData.current.holes[index].index, cardData.handicap)}});
        if(courseData.current){
            setCardData({
                ...cardData,
                totalStrokes: calculateTotal(newScores, 'strokes'),
                totalPoints: calculateTotal(newScores, 'points'),
                scores: newScores
            })
        }
    }

    const onFocus = event => event.target.select();

    const  handleEnter = (event) => {
        if (event.keyCode === 13 || (event.target.value === '0' && event.key === '0')) {
            goToNextInput(event);
        }
    }

    const goToNextInput = (event, currentTarget) => {
        const target = event ? event.target : currentTarget; 
        const form = target.form;
        const index = Array.prototype.indexOf.call(form, target);
        
        if(form.elements[index + 1]){
            form.elements[index + 1].focus();
            window.scrollTo({top: form.elements[index + 1].offsetTop - 200, left: 0, behavior: 'smooth'});    
        }else{
            form.elements[index].blur();
        }
        
        event && event.preventDefault();
    }

    const displayValue = (value, inputValue) => {
        value = !isNaN(value) ? parseInt(value) : null     
        if(!value){
            if(value === 0){
                if(!inputValue){
                    return  "-";
                }
                return value;
            }
            return "\u00A0";
        } 
        return value;
    }

    return(
        cardData.scores ? 
            <ScorecardView
                cardData={cardData}
                courseData={courseData.current}
                setDate={setDate}
                setMSignature={setMSignature}
                setPSignature={setPSignature}
                updateScore={updateScore}
                calculateTotal={calculateTotal}
                onFocus={onFocus}
                handleEnter={handleEnter}
                onBlurScore={onBlurScore}
                readOnly={isReadOnly.current}
                displayValue={displayValue}
            /> 
        : null
    );

};

export default Scorecard;