import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  socket: null,
  type: "",
  requerimentsSelecteds: [],
  usersToAccept: [],
  usersAccepted: [],
  loading: false,
  elemSelectedId: "",
  element: "",
  error: ""
};

const setTravelSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    socket: action.socket,
    element: action.element
  });

const addRequeriment = (state, action) => {
  return updateObject(state, {
    requerimentsSelecteds: [
      ...state.requerimentsSelecteds,
      action.requerimentId
    ]
  });
};

const removeRequeriment = (state, action) => {
  return updateObject(state, {
    requerimentsSelecteds: state.requerimentsSelecteds.filter(
      reqId => reqId !== action.requerimentId
    )
  });
};

const addUserOrUsersToAccept = (state, action) => {
  const { userOrUsersToAccept } = action;
  const usersToAccept = Array.isArray(userOrUsersToAccept)
    ? userOrUsersToAccept
    : [...state.usersToAccept, userOrUsersToAccept];

  return updateObject(state, { usersToAccept });
};

const addUserAccepted = (state, action) =>
  updateObject(state, {
    usersAccepted: [...state.usersAccepted, action.userAccepted]
  });

const removeUserToAccept = (state, action) =>
  updateObject(state, {
    usersToAccept: state.usersToAccept.filter(
      u => u._id !== action.userId && u.shareVehicle
    )
  });

const removeUserAccepted = (state, action) =>
  updateObject(state, {
    usersAccepted: state.usersAccepted.filter(
      u => u._id !== action.userAcceptedId
    )
  });

const travelReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_SOCKET:
      return updateObject(state, { socket: action.socket });
    case actionTypes.SAVE_TRAVEL_STARTS:
      return updateObject(state, { loading: true });
    case actionTypes.SAVE_TRAVEL_SUCCESS:
      return setTravelSuccess(state, action);
    case actionTypes.SAVE_TRAVEL_FAIL:
      return updateObject(state, { loading: false, error: action.message });
    case actionTypes.ADD_REQUERIMENT:
      return addRequeriment(state, action);
    case actionTypes.REMOVE_REQUERIMENT:
      return removeRequeriment(state, action);
    case actionTypes.SET_TYPE:
      return updateObject(state, { type: action.typeSelected });
    case actionTypes.SET_ELEMENT_SELECTED_ID:
      return updateObject(state, { elemSelectedId: action.elemId });
    case actionTypes.ELEMENT_NOT_USED_ANYMORE:
      return updateObject(state, initialState);
    case actionTypes.ADD_USER_TO_ACCEPT:
      return addUserOrUsersToAccept(state, action);
    case actionTypes.ADD_USER_ACCEPTED:
      return addUserAccepted(state, action);
    case actionTypes.CLEAN_SOCKET:
      return updateObject(state, { socket: null });
    case actionTypes.REMOVE_USER_TO_ACCEPT:
      return removeUserToAccept(state, action);
    case actionTypes.REMOVE_USER_ACCEPTED:
      return removeUserAccepted(state, action);
    default:
      return state;
  }
};

export default travelReducer;
