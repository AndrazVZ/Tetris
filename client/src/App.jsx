import React from "react";
import Home from "./components/Home"; 
import Play from "./components/Play";
import Leaderboard from "./components/Leaderboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/play" component={Play}/>
        <Route path="/leaderboard" component={Leaderboard} />
      </Switch>
    </Router>
  
  );
}

export default App;