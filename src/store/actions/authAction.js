import axios from "../../utils/api";
import { toast } from "react-toastify";

export const ADMIN_LOGIN = "ADMIN_LOGIN";

// Posts action
export const loginAction =
  (email, password, success, error) => async (dispatch) => {
    axios
      .post("/login", {
        email,
        password,
      })
      .then(function ({ data }) {
        const { token, user } = data;
        localStorage.setItem("auth", JSON.stringify(data));
        dispatch({
          type: ADMIN_LOGIN,
          payload: {
            token,
            user,
          },
        });
        success && success();
      })
      .catch(function (err) {
        toast.error(err.response.data.message);
        error && error();
      });
  };
export const logoutAction = () => (dispatch) => {
  localStorage.removeItem("auth");
  dispatch({
    type: ADMIN_LOGIN,
    payload: null,
  });
};
