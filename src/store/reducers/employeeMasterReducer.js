import { EMPLOYEEMASTER_GETALL } from "../actions/employeeMasterAction";

const initialState = {
    employeeMasterList: [],
};

const employeeMasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMPLOYEEMASTER_GETALL:
            return {
                ...state,
                employeeMasterList: action.payload,
            };
        default:
            return state;
    }
};

export default employeeMasterReducer;
