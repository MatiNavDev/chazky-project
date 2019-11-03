import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import * as constants from "../../../shared/constants";
import TypeSelector from "../../../Components/TravelSearch/TypeSelector/TypeSelector";
import ErrorComponent from "../../../Components/UI/ErrorComponent/ErrorComponent";
import LoadingComponent from "../../../Components/UI/LoadingComponent/LoadingComponent";

class TypeSelectors extends Component {
  componentDidMount() {
    this.props.onFetchUsers();
    this.props.onFetchVehicles();

    this.listenForRefresh();
  }

  listenForRefresh = () => {
    const { socket } = this.props;

    if (socket) {
      socket.on(constants.SOCKET_REFRESH_USERS, () => {
        this.props.onFetchUsers();
      });
      socket.on(constants.SOCKET_REFRESH_VEHICLES, () => {
        this.props.onFetchVehicles();
      });
    }
  };

  onChooseOption = (event, type) => {
    const { onSetType, onSetElementSelected } = this.props;

    let elemId = event.target.value;
    if (elemId === "false") {
      type = null;
      elemId = false;
    }

    onSetType(type);
    onSetElementSelected(elemId);
  };

  render() {
    const { error, loading, type, elemSelectedId } = this.props;
    let { users, vehicles } = this.props;

    const falseElement = {
      _id: false,
      name: ""
    };

    users = [falseElement, ...users];
    vehicles = [falseElement, ...vehicles];

    if (loading) return <LoadingComponent additionalText="Selectores" />;

    if (error) return <ErrorComponent />;

    const usersSelectorComponent = (
      <TypeSelector
        elemChoosed={elemSelectedId}
        changed={this.onChooseOption}
        title="Usuarios"
        elements={users}
        type={constants.USER}
      ></TypeSelector>
    );

    const vehicleSelectorComponent = (
      <TypeSelector
        elemChoosed={elemSelectedId}
        title="Vehiculos"
        changed={this.onChooseOption}
        elements={vehicles}
        type={constants.VEHICLE}
      ></TypeSelector>
    );
    const typeSelectorToShow =
      type === constants.USER ? (
        usersSelectorComponent
      ) : type === constants.VEHICLE ? (
        vehicleSelectorComponent
      ) : (
        <div>
          {usersSelectorComponent}
          {vehicleSelectorComponent}
        </div>
      );

    return typeSelectorToShow;
  }
}

const mapStateToProps = state => ({
  vehicles: state.vehicle.vehicles,
  loading: state.vehicle.loading || state.user.loading,
  error: state.vehicle.error || state.user.error,
  users: state.user.users,
  type: state.travel.type,
  elemSelectedId: state.travel.elemSelectedId,
  socket: state.travel.socket
});

const mapDispatchToProps = dispatch => ({
  onFetchVehicles: () => dispatch(actions.fetchVehicles()),
  onFetchUsers: () => dispatch(actions.fetchUsers()),
  onSetType: type => dispatch(actions.setType(type)),
  onSetElementSelected: elemId => dispatch(actions.setElementSelectedId(elemId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeSelectors);
