import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import TravelSearch from './Containers/TravelSearch/TravelSearch';
import TravelAcceptance from './Containers/TravelAcceptance/TravelAcceptance';
import Layout from './hoc/Layout/Layout';

import './App.css';

function App() {
  const routes = (
    <Switch>
      <Route path="/travelAcceptance">
        <TravelAcceptance></TravelAcceptance>
      </Route>
      <Route path="/">
        <TravelSearch></TravelSearch>
      </Route>
      <Redirect path="/"></Redirect>
    </Switch>
  );

  return (
    <div className="App">
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
