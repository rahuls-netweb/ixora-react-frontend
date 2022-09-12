import "./App.css";
import AppRoutes from "./Routers";
import { Provider } from "react-redux";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
      <ToastContainer
        // autoClose={2000}
        position="bottom-right"
      />
    </Provider>
  );
}

export default App;
