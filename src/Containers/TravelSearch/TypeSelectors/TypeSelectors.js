import React from 'react';
import TypeSelector from '../../../Components/TypeSelector/TypeSelector';

class TypeSelectors extends React.Component {
  state = {
    users: [
      {
        id: 1,
        description: 'Lucas'
      },
      {
        id: 2,
        description: 'Anna'
      },
      {
        id: 3,
        description: 'Gabi'
      }
    ],
    vehicles: [
      {
        id: 1,
        description: 'Vehicle 1'
      },
      {
        id: 2,
        description: 'Vehicle 2'
      },
      {
        id: 3,
        description: 'Vehicle 3'
      }
    ]
  };

  onChooseOption = event => {
    console.log(event.target.value);
  };

  render() {
    const { users, vehicles } = this.state;

    return (
      <React.Fragment>
        <TypeSelector title="User" changed={this.onChooseOption} elements={vehicles}></TypeSelector>
        <TypeSelector title="Vehicle" elements={users}></TypeSelector>
      </React.Fragment>
    );
  }
}

export default TypeSelectors;
