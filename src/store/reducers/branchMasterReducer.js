import { BRANCHMASTER_GETALL, CURRENT_SELECTED_BRANCH, GET_BRANCHES_BY_USER } from "../actions/branchMasterAction";

const initialState = {
    branchMasterList: [],
    currentSelectedBranch: null,
    currentBranches: [],
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
        case GET_BRANCHES_BY_USER:
            return {
                ...state,
                currentBranches: action.payload,
            }
        default:
            return state;
    }
};

export default branchMasterReducer;
