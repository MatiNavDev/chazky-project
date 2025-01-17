import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import SearchingTravel from "../../../Components/TravelAcceptance/SearchingTravel/SearchingTravel";
import TravelInformation from "../../../Components/TravelAcceptance/TravelInformation/TravelInformation";
import * as constants from "../../../shared/constants";

class User extends Component {
  state = { travelInfo: "" };

  componentDidMount() {
    const { socket } = this.props;

    if (socket) {
      this.listenForAcceptance();
      this.listenForFinalization();
    }
  }

  listenForFinalization = () => {
    const { socket, finishConnection } = this.props;

    socket.on(constants.SOCKET_USER_DISCONNECT, () => {
      finishConnection();
    });
  };

  listenForAcceptance = () => {
    const { socket } = this.props;

    socket.on(constants.SOCKET_USER_LISTENING_FOR_TRAVEL, travelInfo => {
      this.setState({ travelInfo });
    });
  };

  render() {
    const { travelInfo } = this.state;
    const { endTravel, user } = this.props;
    const componentToShow = travelInfo ? (
      <div>
        <TravelInformation travelInfo={travelInfo} />
        <button onClick={endTravel}>Finalizar Viaje</button>
      </div>
    ) : (
      <SearchingTravel elem={user} />
    );
    return componentToShow;
  }
}

const mapStateToProps = state => ({
  socket: state.travel.socket,
  travelInfo: state.travel.travelInfo,
  user: state.travel.element
});

export default withRouter(connect(mapStateToProps)(User));
