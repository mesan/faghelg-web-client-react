import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Program from './Program'
import './index.css';
// using an ES6 transpiler, like babel
import { Router, Route, Link, browserHistory } from 'react-router'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="program" component={Program}/>
        </Route>
    </Router>
), document.getElementById('root'))