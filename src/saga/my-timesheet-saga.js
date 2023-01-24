import { call, put, select, takeLatest } from "redux-saga/effects";
import { getMyTimeSheetDetails } from "../http/requests/timesheet";
import {
  TimeSheetType, 
  setTimeSheetData,
  setVtrackLoader
} from "../redux/actions";

function* workerMyTimeSheetSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield put(setTimeSheetData(null));
    const timesheetPeriodWeek = yield select(state=>
        state.MODULES.timesheetPeriodWeek);
    const timeSheetDetails = yield call(
        getMyTimeSheetDetails,
        payload.periodWeek ? payload.periodWeek : timesheetPeriodWeek,
    );
    // const timeSheetDetails = timeSheetData;
    yield put(setTimeSheetData(timeSheetDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* myTimeSheetSaga() {
  yield takeLatest(
    TimeSheetType.GET_MY_TIMESHEET_DATA,
    workerMyTimeSheetSaga
  );
};
