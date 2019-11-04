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
const saveUserToAccept = userOrUsersToAccept => ({
  type: actionTypes.ADD_USER_TO_ACCEPT,
  userOrUsersToAccept
});

const removeUserToAccept = userId => ({
  type: actionTypes.REMOVE_USER_TO_ACCEPT,
  userId
});
const addUserAccepted = userAccepted => ({
  type: actionTypes.ADD_USER_ACCEPTED,
  userAccepted
});

const removeUserAccepted = userAcceptedId => ({
  type: actionTypes.REMOVE_USER_ACCEPTED,
  userAcceptedId
});

const socketInit = () => dispatch => {
  const socket = socketIOClient("https://chasky-app-server.herokuapp.com");

  socket.on("connect", () => console.log("client connected"));

  dispatch({
    type: actionTypes.INIT_SOCKET,
    socket
  });
};

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
  push,
  socket
) => async dispatch => {
  try {
    dispatch(saveTravelStart());
    const axiosInstance = type === constants.USER ? axiosUsers : axiosVehicles;

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
  } catch (error) {
    dispatch(saveTravelError(error));
  }
};

/**
 * Envia al server que el elemento elegido no se utiliza mas y se puede liberar
 * @param {string} elementId
 * @param {string} type
 */
const sendElementNotUsedAnymore = (
  elementId,
  type,
  socket
) => async dispatch => {
  try {
    const axiosInstance = type === "user" ? axiosUsers : axiosVehicles;
    await axiosInstance.post("/notUsedAnymore", { id: elementId });
    dispatch(elementNotUsedAnymore());
    socket.disconnect();
  } catch (error) {
    //TODO IDEAL: como se ejecuta con el componentWillUnmount lo ideal seria que en el caso
    // de error se planifique una estrategia para ver como volver a enviar este evento al servidor para
    // que quede actualizado. Por fines de simplificacion solo se ejecuta actualmente un console.log
    console.log(error);
  }
};

/**
 * Envia al server el usuario aceptado y lo agrega a la lista
 * @param {*} user
 */
const addAcceptedUser = (user, vehicleId) => async dispatch => {
  try {
    const resp = await axiosVehicles.post("/acceptUser", {
      vehicleId,
      userId: user._id,
      userSocketId: user.socketId
    });

    dispatch(addUserAccepted(user));

    if (resp.data.data.shareVehicle) {
      //si puede compartir vehiculo remueve solo el usuario
      dispatch(removeUserToAccept(user._id));
    } else {
      //si no puede compartir vehiculo remueve todos los usuarios
      dispatch(saveUserToAccept([]));
    }
  } catch (error) {
    //TODO: ideal manejar error, el cual indicaria error del sistema (bug). Para simplificat se hace un console.log
    console.log(error);
  }
};

/**
 * Envia al servidor que el vehiculo rechazo a usuario.
 * Actualiza lista de usuarios a aceptar
 * @param {*} user
 * @param {string} vehicleId
 */
const rejectUserToAccept = (user, vehicleId) => async dispatch => {
  try {
    await axiosVehicles.post("/rejectUser", { userId: user._id, vehicleId });
    dispatch(removeUserToAccept(user._id));
  } catch (error) {
    //TODO: ideal manejar error, el cual indicaria error del sistema (bug). Para simplificat se hace un console.log
    console.log(error);
  }
};

/**
 * Limpia todos los usuarios para que no esten conectados
 */
const setAllNotUsed = history => async dispatch => {
  await Promise.all([
    axiosVehicles.post("/cleanAll"),
    axiosUsers.post("/cleanAll")
  ]);
  dispatch({ type: actionTypes.CLEAN_ALL });
  history.push("/");
  window.location.reload(false);
};

export {
  searchTravel,
  addRequerimentSelected,
  removeRequerimentSelected,
  setType,
  setElementSelectedId,
  sendElementNotUsedAnymore,
  saveUserToAccept as addUserToAccept,
  addAcceptedUser,
  rejectUserToAccept,
  removeUserAccepted,
  removeUserToAccept,
  setAllNotUsed,
  socketInit
};
