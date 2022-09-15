import { COLLEGE_GETALL } from "../actions/collegeAction";

const initialState = {
    collegeList: [],
};

const collegeReducer = (state = initialState, action) => {
    switch (action.type) {
        case COLLEGE_GETALL:
            return {
                ...state,
                collegeList: action.payload,
            };
        default:
            return state;
    }
};

export default collegeReducer;
