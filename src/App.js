import React, { Suspense, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import LoadingComponent from "./Components/UI/LoadingComponent/LoadingComponent";
import * as actions from "./store/actions";
import "./App.css";

const TravelSearch = React.lazy(() =>
  import("./Containers/TravelSearch/TravelSearch.js")
);
const TravelAcceptance = React.lazy(() =>
  import("./Containers/TravelAcceptance/TravelAcceptance")
);

class App extends Component {
  componentDidMount() {
    this.props.onSocketInit();
  }

  render() {
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
}

const mapDispatchToProps = dispatch => ({
  onSocketInit: () => dispatch(actions.socketInit())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
