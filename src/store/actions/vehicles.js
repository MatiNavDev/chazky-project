import * as actionTypes from "./actionTypes";
import { axiosVehicles } from "../../axios-instances";

const fetchVehiclesStart = () => ({
  type: actionTypes.FETCH_VEHICLES_STARTS
});

const fetchVehiclesSuccess = vehicles => ({
  type: actionTypes.FETCH_VEHICLES_SUCCESS,
  vehicles
});

const fetchVehiclesFail = message => ({
  type: actionTypes.FETCH_VEHICLES_FAIL,
  message
});

const fetchVehicles = () => async dispatch => {
  dispatch(fetchVehiclesStart());
  try {
    const resp = await axiosVehicles.get("/");
    dispatch(fetchVehiclesSuccess(resp.data.data.vehicles));
  } catch (error) {
    dispatch(fetchVehiclesFail(error.message));
  }
};

export { fetchVehicles };
