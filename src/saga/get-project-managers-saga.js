import { call, put, takeLatest } from "redux-saga/effects";
import { getProjectManagersList } from "../http/requests/dropdown";
import {
  DropdownType,
  setProjectManagersData,
  setVtrackLoader
} from "../redux/actions";

function* workerProjectManagersSaga() {
  try {
    yield put(setVtrackLoader(true));
    const projectManagerDetails = yield call(getProjectManagersList);
    yield put(setProjectManagersData(projectManagerDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* projectManagersSaga() {
  yield takeLatest(
    DropdownType.GET_PROJECT_MANAGERS_DATA,
    workerProjectManagersSaga
  );
};
