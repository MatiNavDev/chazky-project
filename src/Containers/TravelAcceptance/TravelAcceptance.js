import React, { Component } from "react";
import { connect } from "react-redux";

import User from "./User/User";
import Vehicle from "./Vehicle/Vehicle";

class TravelAcceptance extends Component {
  componentWillUnmount() {
    const { socket } = this.props;

    socket.disconnect();
  }

  render() {
    const { type } = this.props;
    // TODO: cambiar el tipo por usar una variable comun;
    const componentChoosed =
      type === "user" ? <User></User> : <Vehicle></Vehicle>;

    return componentChoosed;
  }
}

const mapStateToProps = state => ({
  socket: state.travel.socket,
  type: state.travel.type
});

export default connect(mapStateToProps)(TravelAcceptance);
