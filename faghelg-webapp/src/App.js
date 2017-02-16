import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Faghelg webapp</h2>
            <Link to={"/program"} className={"lenker"}>Program</Link>
        </div>

          {this.props.children}
      </div>
    );
  }
}

export default App;
