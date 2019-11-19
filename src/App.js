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
import Portmarnock from './staticdata/Portmarnock'
import Large from './staticdata/Large'

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
        data : JSON.parse(Large)
      })

      
      
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
