import { call, put, takeLatest } from "redux-saga/effects";
import { deleteProjectAdminDetails } from "../http/requests/project-admin";
import { getProjectAdminData, ProjectAdminType, setVtrackLoader } from "../redux/actions";

function* workerDeleteProjectAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(deleteProjectAdminDetails, payload.projectId);
    yield put(
      getProjectAdminData({
        pageNo: 1,
        pageSize: 10,
        sortDir: "ASC",
        sortBy: "projectName",
        searchData: ''
      })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* deleteProjectAdminSaga() {
  yield takeLatest(
    ProjectAdminType.DELETE_PROJECT_ADMIN_DATA,
    workerDeleteProjectAdminSaga
  );
};
