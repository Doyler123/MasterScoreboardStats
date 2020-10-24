/*global chrome, gtag _gaq*/

import React, { Component } from 'react';
import './App.css';
import TabContainer from './components/tabs/TabContainer';
import * as chromeExtensionUtil from './util/ChromeExtensionUtil';
import {ALL, ENVS} from './constants/constants';
import { StateProvider, defaultReducer } from './state';
import { sortCourses } from './util/CourseDataUtil';
import Loading from './components/misc/Loading';
import { getQueryParam } from './util/DevUtil';


const getCourseName = (text) => {
  return text.replace("<br>Played at ", "")
}

class App extends Component {

  initialState = {
    hole : ALL,
    course : 0,
    selectedComp: null,
    scorecardOpen: false
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
      let data;
      switch(getQueryParam('data')){
        case 'howdidido':
          data = require('./staticdata/howdididoParsed').default
          break;
        case 'norounds':
          data = require('./staticdata/NoRounds').default
          break;
        case 'oneround':
          data = require('./staticdata/OneRound').default
          break;
        case 'large':
          data = require('./staticdata/Large').default
          break;
        case 'lowscores':
          data = require('./staticdata/LowScores').default
          break;
        case 'largesmall':
          data = require('./staticdata/LargeSmall').default
          break;
        case 'smalllarge':
          data = require('./staticdata/SmallLarge').default
          break;
        case 'pmk':
          data = require('./staticdata/Portmarnock').default
          break;
        case 'vlarge300':
          data = require('./staticdata/VLarge300').default
          break;
        case 'vlarge500':
          data = require('./staticdata/VLarge500').default
          break;
        case 'vlarge1000':
          data = require('./staticdata/VLarge1000').default
          break;
        default:
          data = require('./staticdata/Jonathan').default
      }
      console.log(data)
      //Static data
      // let hdidDataParsed = JSON.parse(howdididoParsed)
      let hdidDataParsed = []
      let dataParsed = JSON.parse(data) 
      this.setState({
        data : dataParsed.concat(hdidDataParsed)
      }, () => {
        this.setState({loading : false})
        })
        
      } else {
        
        // Chrome extension
        
        // let hdidDataParsed = JSON.parse(howdididoParsed)
        let hdidDataParsed = []
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
