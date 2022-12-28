import { call, put, takeLatest } from "redux-saga/effects";
import { projectTasksDetails } from "../http/requests/dropdown";
import {
  setProjectTasks,
  setVtrackLoader,
  TimeSheetType
} from "../redux/actions";

function* workerProjectTasksSaga() {
  try {
    yield put(setVtrackLoader(true));
    const projectTasks = yield call(projectTasksDetails);
    yield put(setProjectTasks(projectTasks));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* projectTasksSaga() {
  yield takeLatest(
    TimeSheetType.GET_PROJECT_TASKS_DATA,
    workerProjectTasksSaga
  );
};
