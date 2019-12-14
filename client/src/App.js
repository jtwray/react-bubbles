import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PrivateRoute } from './utils/PrivateRoute'
import Login from "./components/Login";
import BubblePage from "./components/BubblePage"
import {Home} from './components/Home'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/bubblepage" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
