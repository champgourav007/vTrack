import { call, put, takeLatest } from "redux-saga/effects";
import { getProjectAdminDetails } from "../http/requests/project-admin";
import {
  ProjectAdminType,
  setProjectAdminData,
  setVtrackLoader
} from "../redux/actions";

function* workerProjectAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    const projectAdminDetails = yield call(
      getProjectAdminDetails,
      payload.pageNo,
      payload.pageSize,
      payload.sortDir,
      payload.sortBy
    );
    yield put(setProjectAdminData(projectAdminDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* projectAdminSaga() {
  yield takeLatest(
    ProjectAdminType.GET_PROJECT_ADMIN_DATA,
    workerProjectAdminSaga
  );
};
