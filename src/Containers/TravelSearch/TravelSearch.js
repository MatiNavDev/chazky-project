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
    shareTravel: false,
    location: {
      latitude: {
        value: 0,
        label: "Latitud"
      },
      longitude: {
        value: 0,
        label: "Longitud"
      },
      maxDistance: {
        value: 0,
        label: "Max. Distancia"
      }
    }
  };

  /**
   * Maneja el cambio en el checkbok shareTavel
   */
  onChangeSearchTravel = () => {
    this.setState(prevState => ({ shareTravel: !prevState.shareTravel }));
  };

  /**
   * Maneja el cambio de valor en los input de location
   */
  locationInputChangeHandler = (event, key) => {
    const locationKeyObj = { ...this.state.location[key] };
    locationKeyObj.value = +event.target.value;

    const updatedlocationKey = {
      [key]: locationKeyObj
    };

    this.setState(prevState => ({
      location: { ...prevState.location, ...updatedlocationKey }
    }));
  };

  /**
   * Ejecuta el reducer de buscar viaje
   */
  searchTravel = () => {
    const { shareTravel, location } = this.state;
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
      socket,
      location.latitude.value,
      location.longitude.value,
      location.maxDistance.value
    );
  };

  render() {
    const { shareTravel, location } = this.state;
    const { loading, type, error } = this.props;

    if (loading) return <LoadingComponent additonalText="Viaje" />;

    const shareVehicleinputId = "shareVehicle";

    let requerimentsSelectorComponent = null,
      shareTravelElem = null,
      locationInputsElem = null;

    if (type === constants.USER) {
      requerimentsSelectorComponent = <RequerimentsSelector />;

      shareTravelElem = (
        <div>
          <input
            defaultChecked={shareTravel}
            onChange={this.onChangeSearchTravel}
            type="checkbox"
            id={shareVehicleinputId}
          />
          <label htmlFor={shareVehicleinputId}>
            <span className="fa fa-check" /> Deseas Compartir Viaje ?
          </label>
        </div>
      );

      locationInputsElem = (
        <div>
          {Object.keys(location).map(key => {
            const locationObj = location[key];
            return (
              <div key={key}>
                <label htmlFor={key}>
                  <span className="fa fa-check" />{" "}
                  {"Ingrese " + locationObj.label}
                </label>
                <input
                  style={{ margin: "2px 5px" }}
                  onChange={event =>
                    this.locationInputChangeHandler(event, key)
                  }
                  type="number"
                  id={key}
                  value={locationObj.value}
                />
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div>
        <div>
          <TypeSelectors />
          {requerimentsSelectorComponent}
          {shareTravelElem}
          {locationInputsElem}
          <div style={{ margin: "5px 0" }}>
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
    socket,
    latitude,
    longitude,
    maxDistance
  ) =>
    dispatch(
      actions.searchTravel(
        requerimentsSelecteds,
        type,
        shareTravel,
        elemSelectedId,
        push,
        socket,
        latitude,
        longitude,
        maxDistance
      )
    )
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TravelSearch)
);
