import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TypeSelectors from "./TypeSelectors/TypeSelectors";
import RequerimentsSelector from "./Requeriments/Requeriments";
import LoadingComponent from "../../Components/UI/LoadingComponent/LoadingComponent";
import ErrorComponent from "../../Components/UI/ErrorComponent/ErrorComponent";
import * as actions from "../../store/actions";
import * as constants from "../../shared/constants";

class TravelSearch extends Component {
  state = {
    shareTravel: false
  };

  /**
   * Maneja el cambio en el checkbok shareTavel
   */
  onChangeSearchTravel = () => {
    this.setState(prevState => ({ shareTravel: !prevState.shareTravel }));
  };

  /**
   * Ejecuta el reducer de buscar viaje
   */
  searchTravel = () => {
    const { shareTravel } = this.state;
    const {
      history,
      requerimentsSelecteds,
      onSearchTravel,
      elemSelectedId,
      socket,
      type
    } = this.props;

    onSearchTravel(
      requerimentsSelecteds,
      type,
      shareTravel,
      elemSelectedId,
      history.push,
      socket
    );
  };

  render() {
    const { shareTravel } = this.state;
    const { loading, type, error } = this.props;

    if (loading) return <LoadingComponent additonalText="Viaje" />;

    const inputId = "shareVehicle";

    let requerimentsSelectorComponent = null,
      shareTravelElem = null;

    if (type === constants.USER) {
      requerimentsSelectorComponent = <RequerimentsSelector />;

      shareTravelElem = (
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
      );
    }

    return (
      <div>
        <div>
          <TypeSelectors />
          {requerimentsSelectorComponent}
          {shareTravelElem}

          <div>
            <button disabled={type ? false : true} onClick={this.searchTravel}>
              Search
            </button>
          </div>
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
  socket: state.travel.socket,
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
    push,
    socket
  ) =>
    dispatch(
      actions.searchTravel(
        requerimentsSelecteds,
        type,
        shareTravel,
        elemSelectedId,
        push,
        socket
      )
    )
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TravelSearch)
);
