import { ADMIN_LOGIN } from "../actions/authAction";

const user = localStorage.getItem("auth");

const initialState = {
  user: user ? JSON.parse(user) : null,
};

const authReducer = (state = initialState, action) => {
  console.log("CASE_OUTER", action);
  switch (action.type) {
    case ADMIN_LOGIN:
      console.log("CASE");
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
