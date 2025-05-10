import React from "react";
import Home from "./components/Home"; 
import Play from "./components/Play";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/play" component={Play}/>
      </Switch>
    </Router>
  
  );
}

export default App;