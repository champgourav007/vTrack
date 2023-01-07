import { call, put, select, takeLatest } from "redux-saga/effects";
import { getTimeSheetDetails } from "../http/requests/timesheet";
import {
  TimeSheetType, 
  setVtrackLoader,
  setDetailedTimeSheetData
} from "../redux/actions";

function* workerDetailedTimeSheetSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    const timesheetPeriodWeek = yield select(state=>
        state.MODULES.timesheetPeriodWeek);
    const detailedTimeSheetDetails = yield call(
        getTimeSheetDetails,
        payload.periodWeek ? payload.periodWeek : timesheetPeriodWeek,
        payload.projectId ? payload.projectId : 0,
        payload.employeeId ? payload.employeeId : "",
        payload.projectManagerId ? payload.projectManagerId: ""
    );
    yield put(setDetailedTimeSheetData(detailedTimeSheetDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* detailedTimeSheetSaga() {
  yield takeLatest(
    TimeSheetType.GET_DETAILED_TIMESHEET_DATA,
    workerDetailedTimeSheetSaga
  );
};
