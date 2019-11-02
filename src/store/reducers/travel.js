import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  socketId: "",
  type: "",
  requerimentsSelecteds: [],
  loading: false
};

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

const travelReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_TRAVEL_STARTS:
      return updateObject(state, { loading: true });
    case actionTypes.SAVE_TRAVEL_SUCCESS:
      return updateObject(state, { loading: false, socketId: action.socketId });
    case actionTypes.SAVE_TRAVEL_FAIL:
      return updateObject(state, { loading: false, message: action.message });
    case actionTypes.ADD_REQUERIMENT:
      return addRequeriment(state, action);
    case actionTypes.REMOVE_REQUERIMENT:
      return removeRequeriment(state, action);

    default:
      return state;
  }
};

export default travelReducer;
