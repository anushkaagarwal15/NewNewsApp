import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import NewsItem from './components/NewsItem';

export default class App extends Component {
   //jsx ko html m compile then render on the screen
  render() {
    return (
      <div>
        <NavBar/>
        <News pageSize={5} country = "us" />


      </div>
    )
  }
}


