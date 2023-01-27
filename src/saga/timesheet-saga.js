import { call, put, select, takeLatest } from "redux-saga/effects";
import { getTimeSheetDetails } from "../http/requests/timesheet";
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
    const projectManagerId = yield select(state => 
      state.USER.userData.data.activeUsers.id);
    const timeSheetDetails = yield call(
        getTimeSheetDetails,
        payload.periodWeek ? payload.periodWeek : timesheetPeriodWeek,
        payload.projectId ? payload.projectId : 0,
        payload.employeeId ? payload.employeeId : "",
        projectManagerId ? projectManagerId : ""
    );
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
