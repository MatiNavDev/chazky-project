import React, { Component } from 'react';

import User from './User/User';
import Vehicle from './Vehicle/Vehicle';

class TravelAcceptance extends Component {
  state = {
    type: 'vehicle'
  };

  render() {
    const { type } = this.state;
    // TODO: cambiar el tipo por usar una variable comun;
    const componentChoosed = type === 'user' ? <User></User> : <Vehicle></Vehicle>;

    return componentChoosed;
  }
}

export default TravelAcceptance;
