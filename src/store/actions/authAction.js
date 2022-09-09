import axios from "../../utils/api";

export const ADMIN_LOGIN = "ADMIN_LOGIN";

// Posts action
export const loginAction = () => async (dispatch) => {
  try {
    console.log("action called");
    // const response = axios.get("adasdasda", {headers: {

    // }});
    axios
      .post("/login", {
        email: "kanwaljeet.netweb@gmail.com",
        password: "admin",
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
