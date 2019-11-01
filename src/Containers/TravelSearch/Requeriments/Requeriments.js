import React, { Component } from 'react';

import Requeriment from '../../../Components/TravelSearch/Requeriment/Requeriment';

class Requeriments extends Component {
  state = {
    requeriments: [
      {
        id: 1,
        description: 'Mascota'
      },
      {
        id: 2,
        description: 'Acompaniada'
      }
    ]
  };

  render() {
    const { requeriments } = this.state;
    return (
      <div>
        {requeriments.map(req => (
          <Requeriment req={req}></Requeriment>
        ))}
      </div>
    );
  }
}

export default Requeriments;
