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

/**
 * Envia al reducer anadir un usuario a la lista de usuarios
 * @param {*} user
 */
const addUserToAccept = user => dispatch =>
  dispatch({
    type: actionTypes.ADD_USER_TO_ACCEPT,
    user
  });

const sendVehicleNotUsed = vehicleId => async dispatch => {
  try {
    axiosVehicles.post("/notUsedAnymore", { id: vehicleId });
  } catch (error) {
    //TODO IDEAL: como se ejecuta con el componentWillUnmount lo ideal seria que en el caso
    // de error se planifique una estrategia para ver como volver a enviar este evento al servidor para
    // que quede actualizado. Por fines de simplificacion solo se ejecuta actualmente un console.log
    console.log(error);
  }
};

export { fetchVehicles, addUserToAccept, sendVehicleNotUsed };
