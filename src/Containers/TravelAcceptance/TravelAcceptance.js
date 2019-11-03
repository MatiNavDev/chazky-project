import React, { Component } from "react";
import { connect } from "react-redux";

import User from "./User/User";
import Vehicle from "./Vehicle/Vehicle";
import * as actions from "../../store/actions";

class TravelAcceptance extends Component {
  componentWillUnmount() {
    const {
      socket,
      type,
      elemSelectedId,
      onSendElementNotUsedAnymore
    } = this.props;

    if (socket) {
      socket.disconnect();
      onSendElementNotUsedAnymore(elemSelectedId, type);
    }
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
  type: state.travel.type,
  elemSelectedId: state.travel.elemSelectedId
});

const mapDispatchToProps = dispatch => ({
  onSendElementNotUsedAnymore: (elem, type) =>
    dispatch(actions.sendElementNotUsedAnymore(elem, type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelAcceptance);
