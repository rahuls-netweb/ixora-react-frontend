import { combineReducers } from "redux";
import authReducer from "./authReducer";
import headOfficeReducer from "./headOfficeReducer";
import countryReducer from "./countryReducer";
import qualificationReducer from "./qualificationReducer";
import collegeReducer from "./collegeReducer";
import categoryReducer from "./categoryReducer";
import branchMasterReducer from "./branchMasterReducer";
import employeeMasterReducer from "./employeeMasterReducer";
import permissionsReducer from "./permissionsReducer";
import rolesReducer from "./rolesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  headOffice: headOfficeReducer,
  country: countryReducer,
  qualification: qualificationReducer,
  college: collegeReducer,
  category: categoryReducer,
  branchMaster: branchMasterReducer,
  employeeMaster: employeeMasterReducer,
  permissions: permissionsReducer,
  roles: rolesReducer,
});

export default rootReducer;
