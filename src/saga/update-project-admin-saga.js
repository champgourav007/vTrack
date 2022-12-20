import { call, put, takeLatest } from "redux-saga/effects";
import { updateProjectAdminDetails } from "../http/requests/project-admin";
import { getProjectAdminData, ProjectAdminType, setVtrackLoader } from "../redux/actions";

function* workerUpdateProjectAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(updateProjectAdminDetails, payload.data);
    yield put(
      getProjectAdminData({
        pageNo: 1,
        pageSize: 10,
        sortDir: "ASC",
        sortBy: "projectName",
      })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    yield put(setVtrackLoader(false));
  }
};

export function* updateProjectAdminSaga() {
  yield takeLatest(
    ProjectAdminType.UPDATE_PROJECT_ADMIN_DATA,
    workerUpdateProjectAdminSaga
  );
};