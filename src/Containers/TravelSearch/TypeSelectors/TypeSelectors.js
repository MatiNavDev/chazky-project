import React from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import TypeSelector from "../../../Components/TravelSearch/TypeSelector/TypeSelector";
import ErrorComponent from "../../../Components/UI/ErrorComponent/ErrorComponent";
import LoadingComponent from "../../../Components/UI/LoadingComponent/LoadingComponent";

class TypeSelectors extends React.Component {
  componentDidMount() {
    this.props.onFetchUsers();
    this.props.onFetchVehicles();
  }

  onChooseOption = event => {
    console.log(event.target.value);
  };

  render() {
    const { users, vehicles, error, loading } = this.props;

    if (loading) return <LoadingComponent additionalText="Selectores" />;
    if (error) return <ErrorComponent />;

    return (
      <div>
        <TypeSelector
          title="Vehiculos"
          changed={this.onChooseOption}
          elements={vehicles}
        ></TypeSelector>
        <TypeSelector title="Usuarios" elements={users}></TypeSelector>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vehicles: state.vehicle.vehicles,
  loading: state.vehicle.loading || state.user.loading,
  error: state.vehicle.error || state.user.error,
  users: state.user.users
});

const mapDispatchToProps = dispatch => ({
  onFetchVehicles: () => dispatch(actions.fetchVehicles()),
  onFetchUsers: () => dispatch(actions.fetchUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeSelectors);
