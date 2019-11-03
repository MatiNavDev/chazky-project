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
    }
  }

  listenForNewUserToAccept = () => {
    const { socket, onAddUserToAccept } = this.props;

    socket.on(constants.SOCKET_VEHICLE_LISTENING_FOR_TRAVEL, user => {
      onAddUserToAccept(user);
    });
  };

  acceptUser = user => {
    const { onAddAcceptedUser, elemSelectedId } = this.props;

    onAddAcceptedUser(user, elemSelectedId);
  };

  rejectUser = userInfo => {
    this.setState(prevState => ({
      usersToAccept: prevState.usersToAccept.filter(
        user => user.id !== userInfo.id
      )
    }));
  };

  render() {
    const { usersToAccept, usersAccepted } = this.props;

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
    dispatch(actions.addAcceptedUser(user, vehicleId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vehicle);
