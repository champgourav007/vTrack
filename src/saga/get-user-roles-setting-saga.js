import { call, put, takeLatest } from "redux-saga/effects";
import { getUserRoles } from "../http/requests/settings";
import {
  SettingDataType,
  setUserRoleData,
  setVtrackLoader
} from "../redux/actions";

function* workerGetRolesSaga() {
  try {
    yield put(setVtrackLoader(true));
    const userRoles = yield call(getUserRoles);
    yield put(setUserRoleData(userRoles));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* getRolesSaga() {
  yield takeLatest(
    SettingDataType.GET_USER_ROLE_DATA,
    workerGetRolesSaga
  );
};
