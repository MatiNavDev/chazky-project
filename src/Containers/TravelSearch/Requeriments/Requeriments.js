import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import Requeriment from "../../../Components/TravelSearch/Requeriment/Requeriment";
import ErrorComponent from "../../../Components/UI/ErrorComponent/ErrorComponent";
import LoadingComponent from "../../../Components/UI/LoadingComponent/LoadingComponent";

class Requeriments extends Component {
  componentDidMount() {
    this.props.onFetchRequeriments();
  }

  render() {
    const { requeriments, error, loading } = this.props;
    if (loading) return <LoadingComponent additionalText="Requerimientos" />;

    if (error) return <ErrorComponent />;

    return (
      <div>
        {requeriments.map(req => (
          <Requeriment req={req}></Requeriment>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  requeriments: state.requeriment.requeriments,
  loading: state.requeriment.loading
});

const mapDispatchToProps = dispatch => ({
  onFetchRequeriments: () => dispatch(actions.fetchRequeriments())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Requeriments);
