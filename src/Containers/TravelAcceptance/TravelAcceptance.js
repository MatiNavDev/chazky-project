import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import User from "./User/User";
import Vehicle from "./Vehicle/Vehicle";
import * as actions from "../../store/actions";
import * as constants from "../../shared/constants";

class TravelAcceptance extends Component {
  componentDidMount() {
    this.listenForDisconnect();
  }

  componentWillUnmount() {
    const {
      socket,
      type,
      elemSelectedId,
      onSendElementNotUsedAnymore,
      onSocketInit
    } = this.props;

    if (socket) {
      onSendElementNotUsedAnymore(elemSelectedId, type, socket);
      onSocketInit();
    }
  }

  listenForDisconnect = () => {
    const { socket } = this.props;

    socket.on(constants.SOCKET_DISCONNECT, () => {
      this.finishConnection();
    });
  };

  finishConnection = () => {
    const { socket, history, onSocketInit } = this.props;

    history.push("/");
    socket.disconnect();
    onSocketInit();
  };

  /**
   * Finaliza la conexion del elemento elegido
   */
  endTravel = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const { type } = this.props;
    // TODO: cambiar el tipo por usar una variable comun;
    const componentChoosed =
      type === "user" ? (
        <User
          endTravel={this.endTravel}
          finishConnection={this.finishConnection}
        ></User>
      ) : (
        <Vehicle endTravel={this.endTravel}></Vehicle>
      );

    return componentChoosed;
  }
}

const mapStateToProps = state => ({
  socket: state.travel.socket,
  type: state.travel.type,
  elemSelectedId: state.travel.elemSelectedId
});

const mapDispatchToProps = dispatch => ({
  onSendElementNotUsedAnymore: (elem, type, socket) =>
    dispatch(actions.sendElementNotUsedAnymore(elem, type, socket)),
  onSocketInit: () => dispatch(actions.socketInit())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TravelAcceptance)
);
