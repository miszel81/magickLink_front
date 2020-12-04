import { LOGOUT, GET_USER } from "../actions/types";

const authReducer = (state = null, action) => {
  console.log(action);
  switch (action.type) {
    case GET_USER:
      return action.payload || false;
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

export default authReducer;
