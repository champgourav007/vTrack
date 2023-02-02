import { call, put, takeLatest } from "redux-saga/effects";
import { getAllProjectsDetails } from "../http/requests/dropdown";
import {
  DropdownType,
  setAllProjectsData,
  setVtrackLoader
} from "../redux/actions";

function* workerAllProjectsSaga() {
  try {
    yield put(setVtrackLoader(true));
    const projectsDetails = yield call(getAllProjectsDetails);
    yield put(setAllProjectsData(projectsDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* allProjectsSaga() {
  yield takeLatest(
    DropdownType.GET_ALL_PROJECTS_DATA,
    workerAllProjectsSaga
  );
};
