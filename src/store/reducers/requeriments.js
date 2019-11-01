import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  requeriments: [],
  users: [],
  vehicles: [],
  type: "",
  loading: true,
  error: ""
};

/**
 * Maneja que los requerimientos se puedan traer correctamente
 * @param {*} state
 * @param {*} action
 */
const fetchRequerimentSuccess = (state, action) =>
  updateObject(state, { requeriments: action.requeriments, loading: false });

/**
 * Maneja el error al traer los requerimientos
 * @param {*} state
 * @param {*} action
 */
const fetchRequerimentFail = (state, action) =>
  updateObject(state, { error: action.error.message, loading: false });

const requerimentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_REQUERIMENTS_STARTS:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_REQUERIMENTS_SUCCESS:
      return fetchRequerimentSuccess(state, action);
    case actionTypes.FETCH_REQUERIMENTS_FAIL:
      return fetchRequerimentFail(state, action);
    default:
      return state;
  }
};

export default requerimentReducer;
