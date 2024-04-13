import { generateTokenApi, pesonalDetailsApi } from "../../helpers/callApi";
import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import { GENERATE_TOKEN, PERSONAL_DETAILS } from "./actionTypes";
import {
  generateTokenError,
  generateTokenSuccess,
  personalDetailError,
  personalDetailsSuccess,
} from "./actions";

function* generateToken() {
  try {
    const response = yield call(generateTokenApi);
    yield put(generateTokenSuccess(response));
  } catch (err) {
    yield put(generateTokenError(err));
  }
}

function* personalDetails({ payload: req, navigate }) {
  try {
    const response = yield call(pesonalDetailsApi, req);
    yield put(personalDetailsSuccess(response));
    navigate('/previous-address')
  } catch (err) {
    yield put(personalDetailError(err));
  }
}
export function* watchgenerateToken() {
  yield takeEvery(GENERATE_TOKEN, generateToken);
}

export function* watchPersonalDetails() {
  yield takeEvery(PERSONAL_DETAILS, personalDetails);
}
function* DetailsSaga() {
  yield all([fork(watchgenerateToken), fork(watchPersonalDetails)]);
}

export default DetailsSaga;
