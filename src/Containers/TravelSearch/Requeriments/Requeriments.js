import React, { Component } from "react";
import { connect } from "react-redux";

import Requeriment from "../../../Components/TravelSearch/Requeriment/Requeriment";
import ErrorComponent from "../../../Components/Common/ErrorComponent";
import * as actions from "../../../store/actions";

class Requeriments extends Component {
  componentDidMount() {
    this.props.onFetchRequeriments();
  }

  render() {
    const { requeriments, error, loading } = this.props;
    if (loading) return <div>Cargando requerimientos ...</div>;

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
  requeriments: state.requeriments,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  onFetchRequeriments: () => dispatch(actions.fetchRequeriments())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Requeriments);
