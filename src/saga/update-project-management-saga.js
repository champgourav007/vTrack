import { call, put, takeLatest } from "redux-saga/effects";
import { updateProjectManagementDetails } from "../http/requests/project-management";
import {
  setVtrackLoader,
} from "../redux/actions";
import { getProjectManagementData, ProjectManagementType } from "../redux/actions/project-management";

function* workerUpdateProjectManagementSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    debugger
    yield call(updateProjectManagementDetails, payload.data);
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

export function* updateProjectManagementSaga() {
  yield takeLatest(
    ProjectManagementType.UPDATE_PROJECT_MANAGEMENT_DATA,
    workerUpdateProjectManagementSaga
  );
}
