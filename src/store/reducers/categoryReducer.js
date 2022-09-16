import { CATEGORY_GETALL } from "../actions/categoryAction";

const initialState = {
    categoryList: [],
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_GETALL:
            return {
                ...state,
                categoryList: action.payload,
            };
        default:
            return state;
    }
};

export default categoryReducer;
