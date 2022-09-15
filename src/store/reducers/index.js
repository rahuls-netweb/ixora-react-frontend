import { combineReducers } from "redux";
import authReducer from "./authReducer";
import headOfficeReducer from "./headOfficeReducer";
import countryReducer from "./countryReducer";
import qualificationReducer from "./qualificationReducer";
import collegeReducer from "./collegeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  headOffice: headOfficeReducer,
  country: countryReducer,
  qualification: qualificationReducer,
  college: collegeReducer,
});

export default rootReducer;
