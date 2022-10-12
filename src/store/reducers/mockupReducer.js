import { MOCKUP_GETALL } from "../actions/mockupAction";

const initialState = {
  mockupList: [],
};

const mockupReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOCKUP_GETALL:
      return {
        ...state,
        mockupList: action.payload,
      };
    default:
      return state;
  }
};

export default mockupReducer;
