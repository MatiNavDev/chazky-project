import React, { Component } from "react";
import { connect } from "react-redux";

import SearchingTravel from "../../../Components/TravelAcceptance/SearchingTravel/SearchingTravel";
import UsersAccepted from "../../../Components/TravelAcceptance/UsersAccepted/UsersAccepted";
import UsersToAccept from "../../../Components/TravelAcceptance/UsersToAccept/UsersToAccept";
import * as constants from "../../../shared/constants";

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
    const { usersToAccept, usersAccepted } = this.props;

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
  socket: state.travel.socket,
  usersToAccept: state.travel.usersToAccept,
  usersAccepted: state.travel.usersAccepted
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vehicle);
