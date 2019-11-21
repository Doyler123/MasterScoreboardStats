/*global chrome*/

import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import TabContainer from './components/layout/TabContainer'
import * as chromeExtensionUtil from './util/ChromeExtensionUtil'
import {ALL} from './constants/constants'
import { StateProvider, defaultReducer } from './state'
import { sortCourses } from './util/CourseDataUtil'


import Jonathan from './staticdata/Jonathan'
import LowScores from './staticdata/LowScores'
// import Portmarnock from './staticdata/Portmarnock'
import Large from './staticdata/Large'
// import LargeSmall from './staticdata/LargeSmall'
import SmallLarge from './staticdata/SmallLarge'
// import VLarge300 from './staticdata/VLarge300'
// import VLarge500 from './staticdata/VLarge500' // check hole 3
// import VLarge1000 from './staticdata/VLarge1000'

class App extends Component {

  initialState = {
    hole : ALL,
    course : 0
  }

  constructor(props) {
      super(props);
          
      this.state = {
          data: []
      }
  }

  componentDidMount(){
    
    //Scrape HTML

    // axios.get('http://localhost:3500/scoreData')
      //     .then((response) => {
      //       console.log(response.data)
      //         this.setState({
      //             data : response.data
      //         })
      //     })
      //     .catch((error) => {
      //         console.log(error);
      //     })
      //     .then(() =>{
      //         // always executed
      //     });



      //Static data

      this.setState({
        data : JSON.parse(Jonathan)
      })

      
      // const getNewResult = (result) => {
      //   switch(result){
      //     case "Scratch":
      //       return "Double"
      //     case "Double" :
      //       return "Bogey"
      //     case "Bogey"  :
      //       return "Par"
      //     case "Par"    :
      //       return "Birde"
      //     default :
      //       return result 
      //   }
      // }

      // let testData = JSON.parse(LowScores)

      // testData[0].Competitions.forEach(comp => {
      //   comp.Gross = comp.Gross - 14
      //   comp.Holes.forEach(hole => {
      //     hole.Score = hole.Score - 1
      //     hole.Result = getNewResult(hole.Result)
      //   })
      // });

      // console.log(JSON.stringify(testData, null, 2))
      
      
      // Chrome extension
      
      // chrome.storage.local.get('scoresHtml', (data) => {  
      //   console.log(JSON.stringify(chromeExtensionUtil.parseData(data.scoresHtml), null, 2))
      //   this.setState({
      //     data : chromeExtensionUtil.parseData(data.scoresHtml)
      //   })
      // })

  }

  render() {
    return (
      <StateProvider initialState={this.initialState} reducer={defaultReducer}>
        <div className="App">
          {this.state.data.length  > 0 ? <TabContainer data={this.state.data.sort(sortCourses)}/> : <div>{'no data'}</div>}
        </div>
      </StateProvider>
    );
  }
}


export default App;
