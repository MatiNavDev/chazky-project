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
    const {
      requeriments,
      error,
      loading,
      onAddRequerimentSelected,
      onRemoveRequerimentSelected
    } = this.props;
    if (loading) return <LoadingComponent additionalText="Requerimientos" />;

    if (error) return <ErrorComponent />;

    return (
      <div>
        {requeriments.map(req => (
          <Requeriment
            key={req._id}
            add={onAddRequerimentSelected}
            remove={onRemoveRequerimentSelected}
            req={req}
          ></Requeriment>
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
  onFetchRequeriments: () => dispatch(actions.fetchRequeriments()),
  onRemoveRequerimentSelected: reqId =>
    dispatch(actions.removeRequerimentSelected(reqId)),
  onAddRequerimentSelected: reqId =>
    dispatch(actions.addRequerimentSelected(reqId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Requeriments);
