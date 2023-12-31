import { call, put, takeLatest } from "redux-saga/effects";
import { getTimesheetReports } from "../http/requests/reporting";
import { setVtrackLoader } from "../redux/actions";
import { ReportingType, setReportingData } from "../redux/actions/reporting";

function* workerGetTimesheetReports({ payload }){
  try{
    yield put(setVtrackLoader(true));
    const timesheetReports = yield call(
      getTimesheetReports,
      payload.startDate,
      payload.endDate,
      payload.projectId);
    yield put(setReportingData(timesheetReports));
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