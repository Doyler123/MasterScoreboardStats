import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import TabContainer from './components/layout/TabContainer'


class App extends Component {

  constructor(props) {
      super(props);
          
      this.state = {
          data: []
      }
  }

  componentDidMount(){
      axios.get('http://localhost:3500/scoreData')
          .then((response) => {
            console.log(response.data)
              this.setState({
                  data : response.data
              })
          })
          .catch((error) => {
              console.log(error);
          })
          .then(() =>{
              // always executed
          });
  }

  render() {
    return (
      <div className="App">
        <TabContainer data={this.state.data}/>
      </div>
    );
  }
}

export default App;
