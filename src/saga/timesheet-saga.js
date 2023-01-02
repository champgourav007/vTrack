import { call, put, select, takeLatest } from "redux-saga/effects";
import { getTimeSheetDetails } from "../http/requests/timesheet";
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
    const timesheetPeriodWeek = yield select(state=>
        state.MODULES.timesheetPeriodWeek);
    const employeeID = yield select(state=>
        state.USER.userData.data.activeUsers.id);
    const timeSheetDetails = yield call(
        getTimeSheetDetails,
        payload.periodWeek ? payload.periodWeek : timesheetPeriodWeek,
        payload.projectId ? payload.projectId : "",
        payload.employeeId === 'null' ? "" : payload.employeeId ? payload.employeeId : employeeID
    );
    // const timeSheetDetails = timeSheetData;
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
