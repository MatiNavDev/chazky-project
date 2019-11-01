import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import SearchingTravel from "../../../Components/TravelAcceptance/SearchingTravel/SearchingTravel";
import UsersAccepted from "../../../Components/TravelAcceptance/UsersAccepted/UsersAccepted";
import UsersToAccept from "../../../Components/TravelAcceptance/UsersToAccept/UsersToAccept";

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
    const { endpoint } = this.state;
    this.setState({ socket: socketIOClient(endpoint) });
  }

  componentWillUnmount() {
    //TODO: enviar al server que este vehiculo ya no esta disponible
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

export default Vehicle;
