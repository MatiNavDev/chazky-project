import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import TypeSelectors from './TypeSelectors/TypeSelectors';
import RequerimentsSelector from './Requeriments/Requeriments';

class TravelSearch extends Component {
  state = {
    type: '',
    requeriments: []
  };

  searchTravel = () => this.props.history.push('/travelAcceptance');

  render() {
    return (
      <div>
        <TypeSelectors></TypeSelectors>
        <RequerimentsSelector></RequerimentsSelector>
        <button onClick={this.searchTravel}>Search</button>
      </div>
    );
  }
}

export default withRouter(TravelSearch);
