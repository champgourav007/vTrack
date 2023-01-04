import { call, put, takeLatest } from "redux-saga/effects";
import { getMappedProjectManagementData } from "../http/requests/project-management";
import {
  setVtrackLoader
} from "../redux/actions";
import { ProjectManagementType, setMappedProjectManagementData } from "../redux/actions/project-management";

function* workerMappedProjectManagementSaga() {
  try {
    yield put(setVtrackLoader(true));
    const projectManagementDetails = yield call(getMappedProjectManagementData);
    if(projectManagementDetails)
      yield put(setMappedProjectManagementData(projectManagementDetails));
    else {
      yield put(setMappedProjectManagementData(null));
    }
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
