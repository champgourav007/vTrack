import set from "date-fns/fp/set/index";
import { call, put, takeLatest } from "redux-saga/effects";
import { getProjectManagementDetails } from "../http/requests/project-management";
import {
  setVtrackLoader
} from "../redux/actions";
import { ProjectManagementType, setProjectManagementData } from "../redux/actions/project-management";

function* workerProjectManagementSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    const projectManagementDetails = yield call(
      getProjectManagementDetails,
      payload.projectId,
      payload.pageNo,
      payload.pageSize,
      payload.sortDir,
      payload.sortBy,
      payload.searchData
    );
    yield put(setProjectManagementData(projectManagementDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* projectManagementSaga() {
  yield takeLatest(
    ProjectManagementType.GET_PROJECT_MANAGEMENT_DATA,
    workerProjectManagementSaga
  );
};
