import history from "../history";
import { LOGOUT, GET_USER, MODIFY_USER, LOGIN } from "./types";
import http from "../apis/http";

export const login = (didToken) => async (dispatch) => {
  const res = await http.create({
    baseURL: "http://localhost:5000/api/auth/login/callback",
    headers: {
      Authorization: "Bearer " + didToken,
    },
    method: "POST",
  })();
  console.log(res);
  dispatch({ type: LOGIN, payload: res.data });
};

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

export const modifyUser = (formValues) => async (dispatch) => {
  const res = await http.put(
    "http://localhost:5000/api/user/profile/edit",
    formValues
  );
  console.log(res);
  dispatch({ type: MODIFY_USER, payload: res });
};
