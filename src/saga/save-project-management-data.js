import { call, put, takeLatest } from "redux-saga/effects";
import { postProjectManagementDetails } from "../http/requests/project-management";
import {
  setVtrackLoader,
} from "../redux/actions";
import { getProjectManagementData, ProjectManagementType } from "../redux/actions/project-management";

function* workerSaveProjectManagementSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(postProjectManagementDetails, payload.data);
    yield put(
        getProjectManagementData({
        pageNo: 1,
        pageSize: 10,
        sortDir: "ASC",
        sortBy: "projectName",
        searchData: "",
      })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    yield put(setVtrackLoader(false));
  }
}

export function* saveProjectManagementSaga() {
  yield takeLatest(
    ProjectManagementType.SAVE_PROJECT_MANAGEMENT_DATA,
    workerSaveProjectManagementSaga
  );
}
