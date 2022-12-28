import { call, put, takeLatest } from "redux-saga/effects";
import { getMappedProjectManagementData } from "../http/requests/project-management";
import { mappedProjectManagementData } from "../mock-data/ProjectManagement";
import {
  setVtrackLoader
} from "../redux/actions";
import { ProjectManagementType, setMappedProjectManagementData } from "../redux/actions/project-management";

function* workerMappedProjectManagementSaga() {
  try {
    yield put(setVtrackLoader(true));
    // const projectManagementDetails = yield call(getMappedProjectManagementData);
    yield put(setMappedProjectManagementData(mappedProjectManagementData));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* mappedProjectManagementSaga() {
  yield takeLatest(
    ProjectManagementType.GET_MAPPED_PROJECT_MANAGEMENT_DATA,
    workerMappedProjectManagementSaga
  );
};
