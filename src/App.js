import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import './App.css';

const TravelSearch = React.lazy(() => import('./Containers/TravelSearch/TravelSearch'));
const TravelAcceptance = React.lazy(() => import('./Containers/TravelAcceptance/TravelAcceptance'));

function App() {
  const fallbackElement = <div>Loading ...</div>;

  const routes = (
    <Switch>
      <Route
        path="/travelAcceptance"
        render={() => (
          <Suspense fallback={fallbackElement}>
            <TravelAcceptance></TravelAcceptance>
          </Suspense>
        )}
      ></Route>
      <Route
        path="/"
        render={() => (
          <Suspense fallback={fallbackElement}>
            <TravelSearch></TravelSearch>
          </Suspense>
        )}
      ></Route>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App">
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
