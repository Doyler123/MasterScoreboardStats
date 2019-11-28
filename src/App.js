/*global chrome*/

import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import TabContainer from './components/tabs/TabContainer'
import * as chromeExtensionUtil from './util/ChromeExtensionUtil'
import {ALL} from './constants/constants'
import { StateProvider, defaultReducer } from './state'
import { sortCourses } from './util/CourseDataUtil'
import Loading from './components/misc/Loading'


import Jonathan from './staticdata/Jonathan'
import LowScores from './staticdata/LowScores'
import OneRound from './staticdata/OneRound'
import NoRounds from './staticdata/NoRounds'
// import Portmarnock from './staticdata/Portmarnock'
import Large from './staticdata/Large'
// import LargeSmall from './staticdata/LargeSmall'
// import SmallLarge from './staticdata/SmallLarge'
import VLarge300 from './staticdata/VLarge300'
// import VLarge500 from './staticdata/VLarge500' // check hole 3
// import VLarge1000 from './staticdata/VLarge1000'

class App extends Component {

  initialState = {
    hole : ALL,
    course : 0,
    loading : true
  }

  constructor(props) {
      super(props);
          
      this.state = {
          data: []
      }
  }

  componentDidMount(){

      //Static data

      this.setState({
        data : JSON.parse(Jonathan)
      })
      
      
      // Chrome extension
      
      // chrome.storage.local.get('scoresHtml', (data) => {  
      //   console.log(JSON.stringify(chromeExtensionUtil.parseData(data.scoresHtml), null, 2))
      //   this.setState({
      //     data : chromeExtensionUtil.parseData(data.scoresHtml)
      //   })
      // })

      this.setState({loading : false})
  }

  render() {
    return (
      <StateProvider initialState={this.initialState} reducer={defaultReducer}>
        <div className="App">
          {!this.state.loading ? 
            <TabContainer data={this.state.data.sort(sortCourses)}/> 
            : <Loading />
          }
        </div>
      </StateProvider>
    );
  }
}


export default App;
