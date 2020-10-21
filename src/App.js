/*global chrome, gtag _gaq*/

import React, { Component } from 'react';
import './App.css';
import TabContainer from './components/tabs/TabContainer'
import * as chromeExtensionUtil from './util/ChromeExtensionUtil'
import {ALL, ENVS} from './constants/constants'
import { StateProvider, defaultReducer } from './state'
import { sortCourses } from './util/CourseDataUtil'
import Loading from './components/misc/Loading'

import Jonathan from './staticdata/Jonathan';
import howdididoParsed from './staticdata/howdididoParsed';


const getCourseName = (text) => {
  return text.replace("<br>Played at ", "")
}

class App extends Component {

  initialState = {
    hole : ALL,
    course : 0
  }

  constructor(props) {
      super(props);
          
      this.state = {
          data: [],
          loading : true
      }
  }

  componentDidMount(){
    
    
    if (process.env.NODE_ENV === ENVS.DEVELOPMENT) {
      
      //Static data
      let hdidDataParsed = JSON.parse(howdididoParsed)
      let dataParsed = JSON.parse(Jonathan) 
      this.setState({
        data : dataParsed.concat(hdidDataParsed)
      }, () => {
        this.setState({loading : false})
        })
        
      } else {
        
        // Chrome extension
        
        let hdidDataParsed = JSON.parse(howdididoParsed)
        chrome.storage.local.get('scoresHtml', (data) => {  
          this.setState({
            data : chromeExtensionUtil.parseData(data.scoresHtml).concat(hdidDataParsed)
          }, () => {
            this.setState({loading : false}, () => {
              if(_gaq && this.state.data.length > 0){
                  _gaq.push(['_trackEvent', 'course_loaded', getCourseName(this.state.data[0].Name)]);
              }
            })
          })
        })

      }
      
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
