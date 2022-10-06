import { BRANCHMASTER_GETALL, CURRENT_SELECTED_BRANCH } from "../actions/branchMasterAction";

const initialState = {
    branchMasterList: [],
    currentSelectedBranch: null,
};

const branchMasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case BRANCHMASTER_GETALL:
            return {
                ...state,
                branchMasterList: action.payload,
            };
        case CURRENT_SELECTED_BRANCH:
            return {
                ...state,
                currentSelectedBranch: action.payload,
            };
        default:
            return state;
    }
};

export default branchMasterReducer;
