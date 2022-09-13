import { HEADOFFICE_GETALL } from "../actions/headOfficeAction";

const initialState = {
  headOfficeList: [],
};

const headOfficeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HEADOFFICE_GETALL:
      return {
        ...state,
        headOfficeList: action.payload,
      };
    default:
      return state;
  }
};

export default headOfficeReducer;
