import { call, put, takeLatest } from "redux-saga/effects";
import { getUnregisteredUsers } from "../http/requests/user";
import { setUnregisteredUserDetails, setVtrackLoader, UserType } from "../redux/actions";


function* workerGetUnRegisteredUsers() {
  try {
    yield put(setVtrackLoader(true));
    const userData = yield call(getUnregisteredUsers);
    yield put(setUnregisteredUserDetails(userData));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* getUnRegisteredUsersSaga() {
  yield takeLatest(
    UserType.GET_UNREGISTERED_USER_DETAILS,
    workerGetUnRegisteredUsers
  );
};
