import "./App.css";
import AppRoutes from "./Routers";
import { Provider } from "react-redux";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
function App() {
  // useEffect(() => {
  //   const listener = function (e) {
  //     localStorage.removeItem("auth")
  //   };
  //   window.addEventListener("beforeunload", listener);

  //   return () => {
  //     window.removeEventListener("beforeunload", listener);
  //   };
  // }, []);
  return (
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer autoClose={2000} position="bottom-center" />
    </Provider>
  );
}

export default App;
