import React, { Component } from "react";
import { connect } from "react-redux";

import SearchingTravel from "../../../Components/TravelAcceptance/SearchingTravel/SearchingTravel";
import UsersAccepted from "../../../Components/TravelAcceptance/UsersAccepted/UsersAccepted";
import UsersToAccept from "../../../Components/TravelAcceptance/UsersToAccept/UsersToAccept";
import * as constants from "../../../shared/constants";
import * as actions from "../../../store/actions";

class Vehicle extends Component {
  componentDidMount() {
    const { socket } = this.props;

    if (socket) {
      this.listenForNewUserToAccept();
      this.listenForUserCancelledTravel();
    }
  }

  listenForNewUserToAccept = () => {
    const { socket, onAddUserToAccept } = this.props;

    socket.on(constants.SOCKET_VEHICLE_LISTENING_FOR_TRAVEL, user => {
      onAddUserToAccept(user);
    });
  };

  listenForUserCancelledTravel = () => {
    const { socket, onRemoveUserAccepted, onRemoveUserToAccept } = this.props;

    socket.on(constants.SOCKET_VEHICLE_REMOVE_TRAVELLING_USER, userId => {
      onRemoveUserAccepted(userId);
      onRemoveUserToAccept(userId);
    });
  };

  acceptUser = user => {
    const { onAddAcceptedUser, elemSelectedId } = this.props;

    onAddAcceptedUser(user, elemSelectedId);
  };

  rejectUser = user => {
    const { onRejectUserToAccept, elemSelectedId } = this.props;

    onRejectUserToAccept(user, elemSelectedId);
  };

  render() {
    const { usersToAccept, usersAccepted, endTravel } = this.props;

    const hasUsersToAccept = usersToAccept.length > 0;
    const hasUsersAccepted = usersAccepted.length > 0;

    const usersToAcceptComponent = hasUsersToAccept ? (
      <UsersToAccept
        usersToAccept={usersToAccept}
        acceptUser={this.acceptUser}
        rejectUser={this.rejectUser}
      />
    ) : null;

    const usersAcceptedComponent = hasUsersAccepted ? (
      <UsersAccepted usersAccepted={usersAccepted} />
    ) : null;

    const componentsToShow =
      hasUsersAccepted || hasUsersToAccept ? (
        <div>
          {usersToAcceptComponent}
          {usersAcceptedComponent}
          <button onClick={endTravel}>Finalizar Viajes</button>
        </div>
      ) : (
        <SearchingTravel />
      );

    return componentsToShow;
  }
}

const mapStateToProps = state => ({
  socket: state.travel.socket,
  usersToAccept: state.travel.usersToAccept,
  usersAccepted: state.travel.usersAccepted,
  elemSelectedId: state.travel.elemSelectedId
});

const mapDispatchToProps = dispatch => ({
  onAddUserToAccept: user => dispatch(actions.addUserToAccept(user)),
  onAddAcceptedUser: (user, vehicleId) =>
    dispatch(actions.addAcceptedUser(user, vehicleId)),
  onRejectUserToAccept: (user, vehicleId) =>
    dispatch(actions.rejectUserToAccept(user, vehicleId)),
  onRemoveUserAccepted: userId => dispatch(actions.removeUserAccepted(userId)),
  onRemoveUserToAccept: userId => dispatch(actions.removeUserToAccept(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vehicle);
