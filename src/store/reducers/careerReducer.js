import { CAREER_GETALL } from "../actions/careerAction";

const initialState = {
    careerList: [],
};

const careerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CAREER_GETALL:
            return {
                ...state,
                careerList: action.payload,
            };
        default:
            return state;
    }
};

export default careerReducer;