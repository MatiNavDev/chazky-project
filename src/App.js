import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import LoadingComponent from "./Components/UI/LoadingComponent/LoadingComponent";
import "./App.css";

const TravelSearch = React.lazy(() =>
  import("./Containers/TravelSearch/TravelSearch")
);
const TravelAcceptance = React.lazy(() =>
  import("./Containers/TravelAcceptance/TravelAcceptance")
);

function App() {
  const routes = (
    <Switch>
      <Route
        path="/travelAcceptance"
        render={() => (
          <Suspense fallback={<LoadingComponent />}>
            <TravelAcceptance></TravelAcceptance>
          </Suspense>
        )}
      ></Route>
      <Route
        path="/"
        render={() => (
          <Suspense fallback={<LoadingComponent />}>
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
