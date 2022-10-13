import { EMPLOYEEMASTER_GETALL, GET_USER_BY_BRANCHES } from "../actions/employeeMasterAction";

const initialState = {
    employeeMasterList: [],
    userListByBranch: [],
};

const employeeMasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMPLOYEEMASTER_GETALL:
            return {
                ...state,
                employeeMasterList: action.payload,
            };
        case GET_USER_BY_BRANCHES:
            return {
                ...state,
                userListByBranch: action.payload,
            };
        default:
            return state;
    }
};

export default employeeMasterReducer;
