import React, { Component } from "react";
import { connect } from "react-redux";

import SearchingTravel from "../../../Components/TravelAcceptance/SearchingTravel/SearchingTravel";
import UsersAccepted from "../../../Components/TravelAcceptance/UsersAccepted/UsersAccepted";
import UsersToAccept from "../../../Components/TravelAcceptance/UsersToAccept/UsersToAccept";
import * as constants from "../../../shared/constants";
import * as actions from "../../../store/actions";

class Vehicle extends Component {
  //TODO: hacer que el endpoint se comparta entre components
  state = {
    endpoint: "xxx",
    usersToAccept: [
      {
        id: 1,
        travelInfo: "Viaje mega rapido",
        userName: "Pedro"
      }
    ],
    usersAccepted: []
  };

  componentDidMount() {
    const { socket, onAddUserToAccept } = this.props;

    socket.on(constants.SOCKET_VEHICLE_LISTENING_FOR_TRAVEL, user => {
      onAddUserToAccept(user);
    });
  }

  componentWillUnmount() {
    const { elemSelectedId, sendVehicleNotUsed } = this.props;

    sendVehicleNotUsed(elemSelectedId);
  }

  listenForNewUserToAccept = () => {
    const { socket } = this.state;

    socket.on("newUserToAccept", userToAccept =>
      this.setState(prevState => ({
        usersAccepted: [...prevState.usersAccepted, userToAccept]
      }))
    );
  };

  aceptUser = userInfo => {
    this.setState(prevState => ({
      usersAccepted: [...prevState.usersAccepted, userInfo]
    }));

    this.rejectUser(userInfo);
  };

  rejectUser = userInfo => {
    this.setState(prevState => ({
      usersToAccept: prevState.usersToAccept.filter(
        user => user.id !== userInfo.id
      )
    }));
  };

  render() {
    const { usersToAccept, usersAccepted } = this.state;

    const hasUsers = usersToAccept.length > 0 || usersAccepted.length > 0;

    const componentsToShow = hasUsers ? (
      <div>
        <UsersAccepted usersAccepted={usersAccepted} />
        <UsersToAccept
          usersToAccept={usersToAccept}
          aceptUser={this.aceptUser}
          rejectUser={this.rejectUser}
        />
      </div>
    ) : (
      <SearchingTravel />
    );
    return componentsToShow;
  }
}

const mapStateToProps = state => ({
  socket: state.travel.socket
});

const mapDispatchToProps = dispatch => ({
  onAddUserToAccept: user => dispatch(actions.addUserToAccept(user)),
  onVehicleDisconnect: vehicleId =>
    dispatch(actions.sendVehicleNotUsed(vehicleId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vehicle);
