import * as actionTypes from "./actionTypes";
import { axiosUsers } from "../../axios-instances";

const fetchUsersStart = () => ({
  type: actionTypes.FETCH_USERS_STARTS
});

const fetchUsersSuccess = users => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  users
});

const fetchUsersFail = message => ({
  type: actionTypes.FETCH_USERS_FAIL,
  message
});

const fetchUsers = () => async dispatch => {
  dispatch(fetchUsersStart());
  try {
    const resp = await axiosUsers.get("/");
    dispatch(fetchUsersSuccess(resp.data.data.users));
  } catch (error) {
    dispatch(fetchUsersFail(error.message));
  }
};

export { fetchUsers };
