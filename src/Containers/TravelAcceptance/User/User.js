import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { withRouter } from "react-router-dom";

import SearchingTravel from "../../../Components/TravelAcceptance/SearchingTravel/SearchingTravel";
import TravelInformation from "../../../Components/TravelAcceptance/TravelInformation/TravelInformation";

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

  listenForAcceptance = () => {
    const { socket } = this.state;

    socket.on("travelAccepted", travelInfo => this.setState({ travelInfo }));
  };

  listenForFinalization = () => {
    const { socket } = this.state;

    socket.on("travelFinalized", data => {
      this.setState({ travelInfo: null });
      socket.disconnect();
      this.props.history("/");
    });
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
