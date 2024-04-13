import {
  API_ERROR,
  GENERATE_TOKEN,
  GENERATE_TOKEN_SUCCESS,
  PERSONAL_DETAILS,
  PERSONAL_DETAILS_ERROR,
  PERSONAL_DETAILS_SUCCESS,
} from "./actionTypes";

const initialState = {
  token: null,
  error: null,
  loading: false,
  apiData: null,
};
const Details = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_TOKEN:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GENERATE_TOKEN_SUCCESS:
      state = {
        ...state,
        token: action.payload,
        loading: false,
      };
      break;
    case PERSONAL_DETAILS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case PERSONAL_DETAILS_SUCCESS:
      state = {
        ...state,
        apiData: action.payload,
        loading: false,
      };
      break;
    case PERSONAL_DETAILS_ERROR:
      state = {
        ...state,
        errorData: action.payload,
        loading: false,
      };
      break;
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Details;
