import { call, put, select, takeLatest } from "redux-saga/effects";
import { postTimeSheetPeriod } from "../http/requests/timesheet";
import { TimeSheetType, getTimeSheetData, setVtrackLoader, setTimeSheetPeriodId } from "../redux/actions";

function* workerSaveTimeSheetPeriodSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    const employeeID = yield select(state=>
        state.USER.userData.data.activeUsers.id);
    const data = yield call(postTimeSheetPeriod, { ...payload.data, employeeID: 2});
    yield put(setTimeSheetPeriodId(data.timesheetPeriodId))
    yield put(
      getTimeSheetData({
        // periodWeek: periodWeek.startDate.format('DD MMM') + ' - ' + periodWeek.endDate.format('DD MMM'),
        pageNo: 1,
        pageSize: 10,
        sortDir: "ASC",
      })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    yield put(setVtrackLoader(false));
  }
};

export function* saveTimeSheetPeriodSaga() {
  yield takeLatest(
    TimeSheetType.SAVE_TIMESHEET_PERIOD_DATA,
    workerSaveTimeSheetPeriodSaga
  );
};
