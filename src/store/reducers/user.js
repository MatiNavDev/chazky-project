import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  users: [],
  loading: true,
  error: ""
};

/**
 * Maneja que los requerimientos se puedan traer correctamente
 * @param {*} state
 * @param {*} action
 */
const fetchUserSuccess = (state, action) =>
  updateObject(state, { users: action.users, loading: false });

/**
 * Maneja el error al traer los requerimientos
 * @param {*} state
 * @param {*} action
 */
const fetchUserFail = (state, action) =>
  updateObject(state, { error: action.error.message, loading: false });

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_STARTS:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUserSuccess(state, action);
    case actionTypes.FETCH_USERS_FAIL:
      return fetchUserFail(state, action);
    default:
      return state;
  }
};

export default userReducer;
