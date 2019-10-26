import React from 'react';
import './App.css';
// routers
import {BrowserRouter,Route} from "react-router-dom"



// my components
import Nav from "./components/nav/Nav"



class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      active:0
    }
  }
  // actioners
  updateactive(newactive,parent){
    parent.setState({
      active:newactive
    });
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <div className="main-container">
          <BrowserRouter>
            <Route path="/" />
          </BrowserRouter>
        </div>
        <Nav numberactive={this.state.active} manage={this.updateactive} managecomponent={this}/>
      </div>
    );
  }
}

export default App;
