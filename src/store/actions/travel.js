import socketIOClient from "socket.io-client";

import * as actionTypes from "./actionTypes";
import { axiosUsers, axiosVehicles } from "../../axios-instances";

const saveTravelStart = () => ({
  type: actionTypes.SAVE_TRAVEL_STARTS
});
const saveTravelSuccess = socketId => ({
  type: actionTypes.SAVE_TRAVEL_SUCCESS,
  socketId
});
const saveTravelError = message => ({
  type: actionTypes.SAVE_TRAVEL_FAIL,
  message
});

const searchTravel = (
  requerimentsSelecteds,
  type,
  shareTravel,
  elemSelectedId,
  push
) => dispatch => {
  try {
    dispatch(saveTravelStart());
    const axiosInstance = type === "user" ? axiosUsers : axiosVehicles;

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
        dispatch(saveTravelSuccess(socket.id));

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
 * Anade el requerimiento a la lista de requerimientos Seleccionados
 */
const addRequerimentSelected = requerimentId => dispatch =>
  dispatch({ type: actionTypes.ADD_REQUERIMENT, requerimentId });

/**
 * Anade el requerimiento a la lista de requerimientos Seleccionados
 */
const removeRequerimentSelected = requerimentId => dispatch =>
  dispatch({ type: actionTypes.REMOVE_REQUERIMENT, requerimentId });

const setType = typeSelected => dispatch =>
  dispatch({ type: actionTypes.SET_TYPE, typeSelected });

const setElementSelectedId = elemId => dispatch =>
  dispatch({ type: actionTypes.SET_ELEMENT_SELECTED_ID, elemId });

export {
  searchTravel,
  addRequerimentSelected,
  removeRequerimentSelected,
  setType,
  setElementSelectedId
};
