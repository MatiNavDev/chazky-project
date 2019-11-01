import * as actionTypes from "./actionTypes";
import { axiosRequeriments } from "../../axios-instances";

const fetchRequerimentsStart = () => ({
  type: actionTypes.FETCH_REQUERIMENTS_STARTS
});

const fetchRequerimentsSuccess = requeriments => ({
  type: actionTypes.FETCH_REQUERIMENTS_SUCCESS,
  requeriments
});

const fetchRequerimentsFail = message => ({
  type: actionTypes.FETCH_REQUERIMENTS_FAIL,
  message
});

const fetchRequeriments = () => async dispatch => {
  dispatch(fetchRequerimentsStart());
  try {
    const resp = await axiosRequeriments.get("/");
    dispatch(fetchRequerimentsSuccess(resp.data.data.requeriments));
  } catch (error) {
    dispatch(fetchRequerimentsFail(error.message));
  }
};

export { fetchRequeriments };
