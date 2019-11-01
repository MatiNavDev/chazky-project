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
      <React.Fragment>
        <TypeSelectors></TypeSelectors>
        <RequerimentsSelector></RequerimentsSelector>
        <button onClick={this.searchTravel}>Search</button>
      </React.Fragment>
    );
  }
}

export default withRouter(TravelSearch);
