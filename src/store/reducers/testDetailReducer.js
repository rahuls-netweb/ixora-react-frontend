import { TEST_DETAIL_GETALL } from "../actions/testDetailAction";

const initialState = {
    testDetailList: [],
};

const testDeatilReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST_DETAIL_GETALL:
            return {
                ...state,
                testDetailList: action.payload,
            };
        default:
            return state;
    }
};

export default testDeatilReducer;
