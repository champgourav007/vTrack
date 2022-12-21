import { call, put, takeLatest } from "redux-saga/effects";
import { getAllUserDetails, getUserDetails } from "../http/requests/user";
import { setAllUserDetails, setUserDetails, setVtrackLoader, UserType } from "../redux/actions";

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

function* workerAllUserSaga() {
  try {
    yield put(setVtrackLoader(true));
    const userDetails = yield call(getAllUserDetails);
    yield put(setAllUserDetails(userDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
}

export function* userSaga() {
  yield takeLatest(UserType.GET_USER_DETAILS, workerUserSaga);
}

export function* allUserDetailSaga() {
  yield takeLatest(UserType.GET_ALL_USER_DETAILS, workerAllUserSaga);
}
