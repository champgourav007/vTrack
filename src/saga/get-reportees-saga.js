import { call, put, takeLatest } from "redux-saga/effects";
import { getReportees } from "../http/requests/dropdown";
import {
    DropdownType,
  setReportees,
  setVtrackLoader,
} from "../redux/actions";

function* workerGetReporteesSaga({payload}) {
  try {
    yield put(setVtrackLoader(true));
    const reportees = yield call(getReportees,payload);
    yield put(setReportees(reportees));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* getReporteesSaga() {
  yield takeLatest(
    DropdownType.GET_REPORTEES,
    workerGetReporteesSaga
  );
};
