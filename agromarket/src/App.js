import React from 'react';
import './App.css';
// routers




// my components
import Nav from "./components/nav/Nav"
import Headeragro from "./components/Header/Headeragro"
import Main from "./components/Containers/Main"
import Medals from "./components/Containers/Medals"
import Payment from './components/Containers/Payment';
import Market from "./components/Containers/Market"

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
    let routes = [<Main/>,<Medals/>,<Payment />,<Market/>];
    return (
      <div className="App">
        <Headeragro></Headeragro>
        <div className="main-container">
          {routes[this.state.active]}
        </div>
        <Nav numberactive={this.state.active} manage={this.updateactive} managecomponent={this}/>
      </div>
    );
  }
}

export default App;
