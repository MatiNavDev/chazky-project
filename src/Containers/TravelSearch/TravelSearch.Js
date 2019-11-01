import React, { Component } from 'react';
import TypeSelectors from './TypeSelectors/TypeSelectors';
import RequerimentsSelector from './Requeriments/Requeriments';

class TravelSearch extends Component {
  state = {
    type: '',
    requeriments: []
  };

  render() {
    return (
      <React.Fragment>
        <TypeSelectors></TypeSelectors>
        <RequerimentsSelector></RequerimentsSelector>
        <button>Search</button>
      </React.Fragment>
    );
  }
}

export default TravelSearch;
