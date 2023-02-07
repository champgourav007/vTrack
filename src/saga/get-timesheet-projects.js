import { call, put, takeLatest } from "redux-saga/effects";
import { getTimesheetProjects } from "../http/requests/dropdown";
import {
  DropdownType,
  setTimesheetProjects,
  setVtrackLoader
} from "../redux/actions";

function* workerGetTimesheetProjectsSaga() {
  try {
    yield put(setVtrackLoader(true));
    const timesheetProjects = yield call(getTimesheetProjects);
    yield put(setTimesheetProjects(timesheetProjects));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* getTimesheetProjectsSaga() {
  yield takeLatest(
    DropdownType.GET_TIMESHEET_PROJECTS,
    workerGetTimesheetProjectsSaga
  );
};
