import React, { Component } from 'react';

import GridDataLayout from './layout/GridDataLayout'
import ScoresChart from './charts/ScoresBarChart'
import GrossLineChart from './charts/GrossLineChart'
import GridItem from './layout/GridItem'

export default (props) =>{
    return (
        <GridDataLayout>
            <GridItem>
                <ScoresChart data={props.data} hole={props.hole}/>
            </GridItem>
            <GridItem>
                <GrossLineChart data={props.data} hole={props.hole}/>
            </GridItem>
        </GridDataLayout>
      );
}