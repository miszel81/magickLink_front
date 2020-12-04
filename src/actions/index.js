import history from "../history";
import { LOGOUT, GET_USER } from "./types";
import http from "../apis/http";

export const getUser = () => async (dispatch) => {
  const res = await http.get("http://localhost:5000/api/auth/current_user");
  dispatch({
    type: GET_USER,
    payload: res.data,
  });
};

export const logout = () => async (dispatch) => {
  await http.post("http://localhost:5000/api/auth/logout");
  history.push("/");
  dispatch({ type: LOGOUT });
};
