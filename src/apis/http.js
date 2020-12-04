/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { toast } from "react-toastify";
import Raven from "raven-js";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    Raven.captureException(error);
    toast.error("Unexpected error! Try again later!");
  }

  return Promise.reject(error);
});

const magicLogin = (didToken) => {
  return axios.create({
    baseURL: "http://localhost:5000/api/auth/login/callback",
    headers: {
      Authorization: "Bearer " + didToken,
    },
    method: "POST",
  })();
};

export default {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
  create: axios.create,
  magicLink: magicLogin,
};
