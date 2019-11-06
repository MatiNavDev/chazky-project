import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../store/actions";

class Layout extends Component {
  cleanAll = () => {
    const { onSetNotUsed, history, onSocketInit } = this.props;
    onSetNotUsed(history);
    onSocketInit();
  };

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <header className="App-header">
          Chasky app
          <button onClick={this.cleanAll}>Limpiar Conexiones</button>
        </header>
        <main>{children}</main>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSetNotUsed: history => dispatch(actions.setAllNotUsed(history)),
  onSocketInit: () => dispatch(actions.socketInit())
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Layout)
);
