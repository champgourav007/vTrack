import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { getTimesheetReportee } from "../http/requests/timesheet";
import {
  TimeSheetType, 
  setVtrackLoader,
  setTimeSheetData
} from "../redux/actions";

function* workerTimeSheetReporteeSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield put(setTimeSheetData(null));
    const timesheetPeriodWeek = yield select(state=>
        state.MODULES.timesheetPeriodWeek);
    const timeSheetReporteeDetails = yield call(
        getTimesheetReportee,
        payload.periodWeek ? payload.periodWeek : timesheetPeriodWeek,
        payload.projectId,
        payload.employeeId
    );

    // yield delay(5000);
    yield put(setTimeSheetData(timeSheetReporteeDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* timeSheetReporteeSaga() {
  yield takeLatest(
    TimeSheetType.GET_TIMESHEET_REPORTEE,
    workerTimeSheetReporteeSaga
  );
};
