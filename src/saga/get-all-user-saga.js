import { call, put, takeLatest } from "redux-saga/effects";
import { getAllUsers } from "../http/requests/dropdown";
import {
  DropdownType,
  setAllUsersData,
  setVtrackLoader
} from "../redux/actions";

function* workerAllUsersSaga() {
  try {
    yield put(setVtrackLoader(true));
    const allUsersDetails = yield call(getAllUsers);
    yield put(setAllUsersData(allUsersDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* allUsersSaga() {
  yield takeLatest(
    DropdownType.GET_ALL_USERS,
    workerAllUsersSaga
  );
};
