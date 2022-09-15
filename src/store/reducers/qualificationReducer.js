import { QUALIFICATION_GETALL } from "../actions/qualificationAction";

const initialState = {
    qualificationList: [],
};

const qualificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case QUALIFICATION_GETALL:
            return {
                ...state,
                qualificationList: action.payload,
            };
        default:
            return state;
    }
};

export default qualificationReducer;