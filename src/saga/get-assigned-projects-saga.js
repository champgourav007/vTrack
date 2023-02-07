import { call, put, takeLatest } from "redux-saga/effects";
import { DATE_FORMAT } from "../common/constants/extra-constants";
import { getAssignedProjectsDetails } from "../http/requests/dropdown";
import {
  DropdownType,
  setAssignedProjects,
  setVtrackLoader
} from "../redux/actions";

function* workerAssignedProjectsSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    const assignedProjectsDetails = yield call(getAssignedProjectsDetails,payload);
    yield put(setAssignedProjects(assignedProjectsDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* assignedProjectsSaga() {
  yield takeLatest(
    DropdownType.GET_ASSIGNED_PROJECTS_DATA,
    workerAssignedProjectsSaga
  );
};
