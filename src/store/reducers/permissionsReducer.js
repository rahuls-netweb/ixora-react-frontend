import { PERMISSIONS_GETALL } from "../actions/permissionsAction";

const initialState = {
    permissionsList: [],
};

const permissionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PERMISSIONS_GETALL:
            return {
                ...state,
                permissionsList: action.payload,
            };
        default:
            return state;
    }
};

export default permissionsReducer;