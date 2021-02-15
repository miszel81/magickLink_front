import { LOGIN, LOGOUT } from "../actions/types";

const authReducer = (state = false, action) => {
  console.log(action);
  switch (action.type) {
    case LOGIN:
      return action.payload || false;
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

export default authReducer;
