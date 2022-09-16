import { ROLES_GETALL } from "../actions/rolesAction";

const initialState = {
    rolesList: [],
};

const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ROLES_GETALL:
            return {
                ...state,
                rolesList: action.payload,
            };
        default:
            return state;
    }
};

export default rolesReducer;