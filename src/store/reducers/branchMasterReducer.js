import { BRANCHMASTER_GETALL } from "../actions/branchMasterAction";

const initialState = {
    branchMasterList: [],
};

const branchMasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case BRANCHMASTER_GETALL:
            return {
                ...state,
                branchMasterList: action.payload,
            };
        default:
            return state;
    }
};

export default branchMasterReducer;
