import {
  GENERATE_TOKEN,
  GENERATE_TOKEN_SUCCESS,
  GENERATE_TOKEN_ERROR,
  API_ERROR,
  PERSONAL_DETAILS,
  PERSONAL_DETAILS_SUCCESS,
  PERSONAL_DETAILS_ERROR,
} from "./actionTypes";

export const generateToken = () => {
  return {
    type: GENERATE_TOKEN,
  };
};
export const generateTokenSuccess = (data) => {
  return {
    type: GENERATE_TOKEN_SUCCESS,
    payload: data,
  };
};
export const generateTokenError = (error) => {
  return {
    type: GENERATE_TOKEN_ERROR,
    payload: error,
  };
};

export const personalDetail = (data, navigate) => {
  return {
    type: PERSONAL_DETAILS,
    payload:data,
    navigate,
  };
};

export const personalDetailsSuccess = (data) => {
  return {
    type: PERSONAL_DETAILS_SUCCESS,
    payload: data,
  };
};

export const personalDetailError = (err) => {
  return {
    type: PERSONAL_DETAILS_ERROR,
    payload: err,
  };
};
export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
