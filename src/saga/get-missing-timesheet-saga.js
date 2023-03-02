import { call, put, takeLatest } from "redux-saga/effects";
import { getMissingTimesheet } from "../http/requests/reporting";
import { setVtrackLoader } from "../redux/actions";
import { ReportingType, setReportingData } from "../redux/actions/reporting";

function* workerGetMisingTimesheet({ payload }){
  try{
    yield put(setVtrackLoader(true));
    const missingTimesheet = yield call(
      getMissingTimesheet,
      payload.startDate,
      payload.endDate);
    yield put(setReportingData(missingTimesheet));
    yield put(setVtrackLoader(false));
  } catch(err){
    console.log(err);
    yield put(setVtrackLoader(false));
  }
}

export function* getMissingTimesheetsaga() {
  yield takeLatest(
    ReportingType.GET_MISSING_TIMESHEET,
    workerGetMisingTimesheet
  );
};