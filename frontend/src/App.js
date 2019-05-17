/*global chrome*/

import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import TabContainer from './components/layout/TabContainer'

import parseData from './util/parseData'

import {Jonathan} from './util/StaticData'

class App extends Component {

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

      // this.setState({
      //   data : JSON.parse(Jonathan)
      // })



      //Chrome extension
      
      chrome.storage.local.get('scoresHtml', (data) => {  
        this.setState({
          data : parseData(data.scoresHtml)
        })
      })



  }

  render() {
    console.log(this.state.data)
    return (
      <div className="App">
        <TabContainer data={this.state.data}/>
      </div>
    );
  }
}


export default App;
