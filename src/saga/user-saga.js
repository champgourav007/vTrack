import { call, put, takeLatest } from "redux-saga/effects";
import { getUserDetails } from "../http/requests/user";
import { setUserDetails, UserType } from "../redux/actions";

function* workerUserSaga() {
  try {
    const userDetails = yield call(getUserDetails);
    yield put(setUserDetails(userDetails));
  } catch(err) {
    console.log(err);
  }
}

export function* userSaga() {
  yield takeLatest(UserType.GET_USER_DETAILS, workerUserSaga); 
}