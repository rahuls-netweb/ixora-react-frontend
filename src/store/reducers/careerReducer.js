import { CAREER_GETALL, CAREER_GETSINGLE } from "../actions/careerAction";

const initialState = {
    careerList: [],
    singlecareer: null,
};

const careerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CAREER_GETALL:
            return {
                ...state,
                careerList: action.payload,
            };
        case CAREER_GETSINGLE:
            return {
                ...state,
                singlecareer: action.payload,
            };
        default:
            return state;
    }
};

export default careerReducer;