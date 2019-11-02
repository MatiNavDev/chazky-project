import socketIOClient from "socket.io-client";

import * as actionTypes from "./actionTypes";
import * as constants from "../../shared/constants";
import { axiosUsers, axiosVehicles } from "../../axios-instances";

/**
 * Anade el requerimiento a la lista de requerimientos Seleccionados
 */
const addRequerimentSelected = requerimentId => dispatch =>
  dispatch({ type: actionTypes.ADD_REQUERIMENT, requerimentId });

/**
 * Anade el requerimiento a la lista de requerimientos Seleccionados
 */
const removeRequerimentSelected = requerimentId => dispatch =>
  dispatch({ type: actionTypes.REMOVE_REQUERIMENT, requerimentId });

/**
 * setea el tipo elegido por el usuario en el selector
 * @param {*} typeSelected
 */
const setType = typeSelected => dispatch =>
  dispatch({ type: actionTypes.SET_TYPE, typeSelected });

/**
 * Setea el elemento elegido por el usuario en el selector
 * @param {*} elemId
 */
const setElementSelectedId = elemId => dispatch =>
  dispatch({ type: actionTypes.SET_ELEMENT_SELECTED_ID, elemId });

const elementNotUsedAnymore = () => ({
  type: actionTypes.ELEMENT_NOT_USED_ANYMORE
});

// SET TRAVEL

const saveTravelStart = () => ({
  type: actionTypes.SAVE_TRAVEL_STARTS
});
const saveTravelSuccess = socket => ({
  type: actionTypes.SAVE_TRAVEL_SUCCESS,
  socket
});
const saveTravelError = message => ({
  type: actionTypes.SAVE_TRAVEL_FAIL,
  message
});
const saveUserToAccept = usersToAccept => ({
  type: actionTypes.ADD_USER_TO_ACCEPT,
  usersToAccept
});

/**
 * Envia la busqueda al servidor + inicia conexion con el socket
 * @param {*} requerimentsSelecteds
 * @param {*} type
 * @param {*} shareTravel
 * @param {*} elemSelectedId
 * @param {*} push
 */
const searchTravel = (
  requerimentsSelecteds,
  type,
  shareTravel,
  elemSelectedId,
  push
) => dispatch => {
  try {
    dispatch(saveTravelStart());
    const axiosInstance = type === constants.USER ? axiosUsers : axiosVehicles;

    const socket = socketIOClient("http://127.0.0.1:3007");
    socket.on("connect", async () => {
      try {
        const body = {
          requerimentsSelecteds,
          shareTravel,
          [type]: elemSelectedId,
          socketId: socket.id
        };
        const resp = await axiosInstance.post("/", body);
        dispatch(saveTravelSuccess(socket));
        if (type === constants.VEHICLE)
          dispatch(saveUserToAccept(resp.data.data.usersToAccept));

        push("/travelAcceptance");
      } catch (error) {
        dispatch(saveTravelError(error));
      }
    });
  } catch (error) {
    dispatch(saveTravelError(error));
  }
};

/**
 * Envia al server que el elemento elegido no se utiliza mas y se puede liberar
 * @param {string} elementId
 * @param {string} type
 */
const sendElementNotUsedAnymore = (elementId, type) => dispatch => {
  try {
    const axiosInstance = type === "user" ? axiosUsers : axiosVehicles;
    axiosInstance.post("/notUsedAnymore", { id: elementId });
    dispatch(elementNotUsedAnymore());
  } catch (error) {
    //TODO IDEAL: como se ejecuta con el componentWillUnmount lo ideal seria que en el caso
    // de error se planifique una estrategia para ver como volver a enviar este evento al servidor para
    // que quede actualizado. Por fines de simplificacion solo se ejecuta actualmente un console.log
    console.log(error);
  }
};

export {
  searchTravel,
  addRequerimentSelected,
  removeRequerimentSelected,
  setType,
  setElementSelectedId,
  sendElementNotUsedAnymore
};
