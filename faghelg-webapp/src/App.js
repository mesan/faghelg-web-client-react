import React, { Component } from 'react';
import logo from './netcompanylogo.jpg';
import './App.css';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <h1>Faghelg webapp</h1>
          <ul>
            <li><Link to={"/program"} className={"lenker"}>Program</Link></li>
            <li><Link to={"/persons"} className={"lenker"}>Personer</Link></li>
          </ul>
        </div>
          {this.props.children}
      </div>
    );
  }
}

export default App;
