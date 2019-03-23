import React, { Component } from "react";
import { BrowserRouter , Route} from "react-router-dom";


//import image from './image1';

import "./App.css";
import FetchRandomMovie from "./components/FetchRandomMovie";
import Particles from 'react-particles-js';
const particleOpt={
  particules:{
    number:{
      value : 300,
      density:{
        enable:true,
        value_area:1000
      }
    }
  }}

class App extends Component {
  state = {
    visible: true
  };
  
  render() {
    return (
      
      <div className="App"> 
      <FetchRandomMovie />
      <Particles params={particleOpt}/>
       

        
      </div>
    );
  }
}

export default App;
