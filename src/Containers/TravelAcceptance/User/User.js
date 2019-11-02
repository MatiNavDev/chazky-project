import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { withRouter } from "react-router-dom";

import SearchingTravel from "../../../Components/TravelAcceptance/SearchingTravel/SearchingTravel";
import TravelInformation from "../../../Components/TravelAcceptance/TravelInformation/TravelInformation";
import * as constants from "../../../shared/constants";

class User extends Component {
  //TODO: hacer que el endpoint se comparta entre components
  state = {
    endpoint: "xxx",
    travelInfo: {
      description: "Vehiculo 1 ha tomado su viaje",
      time: "12 minutos"
    }
  };

  componentDidMount() {
    const { endpoint } = this.state;
    this.setState({ socket: socketIOClient(endpoint) });

    this.listenForAcceptance();
    this.listenForFinalization();
  }

  componentWillUnmount() {
    const { elemSelectedId, sendVehicleNotUsed } = this.props;

    sendVehicleNotUsed(elemSelectedId);
  }

  listenForFinalization = () => {
    const { socket, history } = this.props;

    socket.on(constants.SOCKET_USER_DISCONNECT, () => {
      socket.disconnect();
      history.push("/");
    });
  };

  listenForAcceptance = () => {
    const { socket } = this.props;

    socket.on(constants.SOCKET_USER_LISTENING_FOR_TRAVEL, () =>
      console.log("yeahh")
    );
  };

  render() {
    const { travelInfo } = this.state;

    const componentToShow = travelInfo ? (
      <TravelInformation
        description={travelInfo.description}
        time={travelInfo.time}
      />
    ) : (
      <SearchingTravel />
    );
    return componentToShow;
  }
}

export default withRouter(User);
