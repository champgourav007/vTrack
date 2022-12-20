import { call, put, takeLatest } from "redux-saga/effects";
import { getUserDetails } from "../http/requests/user";
import { setUserDetails, setVtrackLoader, UserType } from "../redux/actions";

function* workerUserSaga() {
  try {
    yield put(setVtrackLoader(true));
    const userDetails = yield call(getUserDetails);
    yield put(setUserDetails(userDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
}

export function* userSaga() {
  yield takeLatest(UserType.GET_USER_DETAILS, workerUserSaga);
}
