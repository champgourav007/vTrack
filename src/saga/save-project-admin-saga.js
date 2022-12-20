import { call, put, takeLatest } from "redux-saga/effects";
import { postProjectAdminDetails } from "../http/requests/project-admin";
import { getProjectAdminData, ProjectAdminType, setVtrackLoader } from "../redux/actions";

function* workerSaveProjectAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(postProjectAdminDetails, payload.data);
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

export function* saveProjectAdminSaga() {
  yield takeLatest(
    ProjectAdminType.SAVE_PROJECT_ADMIN_DATA,
    workerSaveProjectAdminSaga
  );
};
