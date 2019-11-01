import React, { Component, Fragment } from 'react';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <header className="App-header">Chasky app</header>
        <main>{children}</main>
      </Fragment>
    );
  }
}

export default Layout;
