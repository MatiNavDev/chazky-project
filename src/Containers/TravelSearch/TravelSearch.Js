import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TypeSelectors from "./TypeSelectors/TypeSelectors";
import RequerimentsSelector from "./Requeriments/Requeriments";
import LoadingComponent from "../../Components/UI/LoadingComponent/LoadingComponent";
import * as actions from "../../store/actions";

class TravelSearch extends Component {
  state = {
    shareTravel: false
  };

  onChangeSearchTravel = () => {
    this.setState(prevState => ({ shareTravel: prevState.searchTravel }));
  };

  searchTravel = () => {
    const { shareTravel } = this.state;
    const { history, requerimentsSelected, onSearchTravel, type } = this.props;

    onSearchTravel(requerimentsSelected, type, shareTravel, history.push);
  };

  render() {
    const { shareTravel } = this.state;
    const { loading } = this.props;

    if (loading) return <LoadingComponent additonalText="Viaje" />;

    const inputId = "shareVehicle";

    return (
      <div>
        <TypeSelectors></TypeSelectors>
        <RequerimentsSelector></RequerimentsSelector>
        <div>
          <input
            defaultChecked={shareTravel}
            onChange={this.onChangeSearchTravel}
            type="checkbox"
            id={inputId}
          />
          <label htmlFor={inputId}>
            <span className="fa fa-check" /> Deseas Compartir Viaje ?
          </label>
        </div>
        <button onClick={this.searchTravel}>Search</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  type: state.travel.type,
  requerimentsSelected: state.travel.requerimentsSelected,
  loading: state.travel.loading,
  shareTravel: state.travel.shareTravel
});

const mapDispatchToProps = dispatch => ({
  onSearchTravel: (requerimentsSelected, type, shareTravel) =>
    dispatch(actions.searchTravel(requerimentsSelected, type, shareTravel))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TravelSearch)
);
