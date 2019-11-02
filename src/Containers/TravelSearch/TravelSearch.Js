import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TypeSelectors from "./TypeSelectors/TypeSelectors";
import RequerimentsSelector from "./Requeriments/Requeriments";
import LoadingComponent from "../../Components/UI/LoadingComponent/LoadingComponent";
import ErrorComponent from "../../Components/UI/ErrorComponent/ErrorComponent";
import * as actions from "../../store/actions";

class TravelSearch extends Component {
  state = {
    shareTravel: false
  };

  onChangeSearchTravel = () => {
    this.setState(prevState => ({ shareTravel: !prevState.shareTravel }));
  };

  searchTravel = () => {
    const { shareTravel } = this.state;
    const {
      history,
      requerimentsSelecteds,
      onSearchTravel,
      elemSelectedId,
      type
    } = this.props;

    onSearchTravel(
      requerimentsSelecteds,
      type,
      shareTravel,
      elemSelectedId,
      history.push
    );
  };

  render() {
    const { shareTravel } = this.state;
    const { loading, type, error } = this.props;

    if (loading) return <LoadingComponent additonalText="Viaje" />;

    const inputId = "shareVehicle";

    return (
      <div>
        <div>
          <TypeSelectors></TypeSelectors>
          <RequerimentsSelector></RequerimentsSelector>
          <div>
            <input
              defaultChecked={shareTravel}
              onChange={this.onChangeSearchTravel}
              type="checkbox"
              id={inputId}
            />
            <label htmlFor={inputId}>
              <span className="fa fa-check" /> Deseas Compartir Viaje ?
            </label>
          </div>
          <button disabled={type ? false : true} onClick={this.searchTravel}>
            Search
          </button>
        </div>
        {error ? (
          <div style={{ color: "red" }}>
            <ErrorComponent></ErrorComponent>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  type: state.travel.type,
  requerimentsSelecteds: state.travel.requerimentsSelecteds,
  loading: state.travel.loading,
  shareTravel: state.travel.shareTravel,
  elemSelectedId: state.travel.elemSelectedId,
  error: state.travel.error
});

const mapDispatchToProps = dispatch => ({
  onSearchTravel: (
    requerimentsSelecteds,
    type,
    shareTravel,
    elemSelectedId,
    push
  ) =>
    dispatch(
      actions.searchTravel(
        requerimentsSelecteds,
        type,
        shareTravel,
        elemSelectedId,
        push
      )
    )
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TravelSearch)
);
