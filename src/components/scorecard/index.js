import React, { useRef } from 'react';
import ScorecardView from './ScorecardView';
import { calculateTotal } from './util/calculationsUtil';
import { SCORES } from '../../constants/constants';


const Scorecard = ({cardData, courseData, readOnly}) => {

    const isReadOnly = useRef(readOnly ? true : false);

    const onFocus = event => event.target.select();

    const displayValue = (value, inputValue) => {
        
        if(value === SCORES.NR){
            return  "-";
        }
        
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
        cardData.Holes ? 
            <ScorecardView
                cardData={cardData}
                courseData={courseData}
                calculateTotal={calculateTotal}
                readOnly={isReadOnly.current}
                displayValue={displayValue}
            /> 
        : null
    );

};

export default Scorecard;