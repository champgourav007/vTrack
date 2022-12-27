import { call, put, takeLatest } from "redux-saga/effects";
import { timeSheetData } from "../mock-data/TableData";
// import { getTimeSheetDetails } from "../http/requests/client-admin";
import {
  TimeSheetType, 
  setTimeSheetData,
  setVtrackLoader
} from "../redux/actions";

function* workerTimeSheetSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    // const TimeSheetDetails = yield call(
    //   getTimeSheetDetails,
    //   payload.pageNo,
    //   payload.pageSize,
    //   payload.sortDir,
    //   payload.sortBy,
    //   payload.searchData
    // );
    const timeSheetDetails = timeSheetData;
    yield put(setTimeSheetData(timeSheetDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* timeSheetSaga() {
  yield takeLatest(
    TimeSheetType.GET_TIMESHEET_DATA,
    workerTimeSheetSaga
  );
};
