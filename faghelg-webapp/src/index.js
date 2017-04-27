import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Program from "./program/Program";
import Persons from "./persons/Persons";
import "./index.css";
// using an ES6 transpiler, like babel
import {Router, Route, browserHistory} from "react-router";

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="program" component={Program}/>
            <Route path="persons" component={Persons}/>
        </Route>
    </Router>
), document.getElementById('root'));
