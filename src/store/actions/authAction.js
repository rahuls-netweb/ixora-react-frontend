import axios from "../../utils/api";

export const ADMIN_LOGIN = "ADMIN_LOGIN";

// Posts action
export const loginAction = (email, password) => async (dispatch) => {
  try {
    console.log("action called");

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
      });
  } catch (err) {}
};
export const logoutAction = () => (dispatch) => {
  alert("logout action called");

  localStorage.removeItem("auth");
  dispatch({
    type: ADMIN_LOGIN,
    payload: null,
  });
};
