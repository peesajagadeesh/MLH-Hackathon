import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Seasons from './Seasons';
import SeasonPage from './SeasonPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/ui">
          <Seasons />
        </Route>
        <Route path="/ui/:id" render={routeProps => <SeasonPage id={routeProps.match.params.id} /> }/>
      </Switch>
    </Router>
  );
}

export default App;
