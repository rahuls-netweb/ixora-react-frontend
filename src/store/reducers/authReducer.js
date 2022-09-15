import { ADMIN_LOGIN } from "../actions/authAction";

const user = localStorage.getItem("auth");

const initialState = {
  user: user ? JSON.parse(user) : null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
