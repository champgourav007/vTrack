import { call, put, takeLatest } from "redux-saga/effects";
import { getTimesheetReports } from "../http/requests/reporting";
import { setVtrackLoader } from "../redux/actions";
import { ReportingType, setTimesheetReports } from "../redux/actions/reporting";

function* workerGetTimesheetReports({ payload }){
  try{
    yield put(setVtrackLoader(true));
    const timesheetReports = yield call(
      getTimesheetReports,
      payload.startDate,
      payload.endDate,
      payload.pageNo,
      payload.pageSize);
    yield put(setTimesheetReports(timesheetReports));
    yield put(setVtrackLoader(false));
  } catch(err){
    console.log(err);
    yield put(setVtrackLoader(false));
  }
}

export function* getTimesheetReportsSaga() {
  yield takeLatest(
    ReportingType.GET_TIMESHEET_REPORTS,
    workerGetTimesheetReports
  );
};