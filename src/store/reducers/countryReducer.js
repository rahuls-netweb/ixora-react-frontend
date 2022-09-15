import { COUNTRY_GETALL } from "../actions/countryAction";

const initialState = {
    countryList: [],
};

const countryReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNTRY_GETALL:
            return {
                ...state,
                countryList: action.payload,
            };
        default:
            return state;
    }
};

export default countryReducer;
