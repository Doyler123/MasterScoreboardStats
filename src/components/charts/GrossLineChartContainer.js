import React, { useState, useRef } from 'react';
import GrossLineChart from './GrossLineChart';

import {COMBINED} from '../../constants/constants';


export default function(props){

    const tabs = useRef(Object.keys(props.chartData).sort((a, b) => props.chartData[b].comps.length - props.chartData[a].comps.length));

    const getInitialData = () => {
        if(props.chartData && props.course === COMBINED){
            let initialTab = getInitialTab();
            return props.chartData[initialTab];
        }else if(props.chartData){
            return Object.values(props.chartData)[0];
        }
        return null;   
    }

    const getInitialTab = () =>{
        if(props.chartData && props.course === COMBINED){
            return tabs.current[0]
        }
    }

    const [ data, setData ] = useState(getInitialData());
    const [ tab, setTab ] = useState(getInitialTab());


    const changeTab = (e, newTab) => {
        setTab(newTab)
        setData(props.chartData[newTab])
    }

    if(!data){
        return null;
    }

    return(
        <GrossLineChart
            {...props}
            data={data}
            tabs={tabs.current}
            tab={tab}
            handleTabChange={changeTab}
         />
    )

}