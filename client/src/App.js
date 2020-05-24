import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.scss';
import Seasons from './Seasons';
import SeasonPage from './SeasonPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Seasons />
        </Route>
        <Route path="/:id" render={routeProps => <SeasonPage id={routeProps.match.params.id} /> }/>
      </Switch>
    </Router>
  );
}

export default App;
