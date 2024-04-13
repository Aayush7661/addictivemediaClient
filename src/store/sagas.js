import { all } from "redux-saga/effects";

import DetailsSaga from "./details/saga";

export default function* rootSaga() {
    yield all([
        DetailsSaga(),
    ])
}