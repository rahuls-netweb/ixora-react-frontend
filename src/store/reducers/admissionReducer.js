import { ADMISSION_GETALL } from "../actions/admissionAction";

const initialState = {
    admissionList: [],
};

const admissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMISSION_GETALL:
            return {
                ...state,
                admissionList: action.payload,
            };
        default:
            return state;
    }
};

export default admissionReducer;
