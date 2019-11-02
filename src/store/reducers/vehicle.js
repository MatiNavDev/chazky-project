import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  vehicles: [],
  loading: true,
  error: ""
};

/**
 * Maneja que los requerimientos se puedan traer correctamente
 * @param {*} state
 * @param {*} action
 */
const fetchVehicleSuccess = (state, action) =>
  updateObject(state, { vehicles: action.vehicles, loading: false });

/**
 * Maneja el error al traer los requerimientos
 * @param {*} state
 * @param {*} action
 */
const fetchVehicleFail = (state, action) =>
  updateObject(state, { error: action.error.message, loading: false });

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_VEHICLES_STARTS:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_VEHICLES_SUCCESS:
      return fetchVehicleSuccess(state, action);
    case actionTypes.FETCH_VEHICLES_FAIL:
      return fetchVehicleFail(state, action);
    default:
      return state;
  }
};

export default vehicleReducer;
