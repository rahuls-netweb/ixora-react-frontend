import { combineReducers } from "redux";
import authReducer from "./authReducer";
import headOfficeReducer from "./headOfficeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  headOffice: headOfficeReducer,
});

export default rootReducer;
