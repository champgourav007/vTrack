import { call, put, select, takeLatest } from "redux-saga/effects";
import { postTimeSheetDetails } from "../http/requests/timesheet";
import { TimeSheetType, getTimeSheetData, setVtrackLoader } from "../redux/actions";

function* workerSaveTimeSheetSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    const timesheetPeriodId = yield select(state=>
        state.MODULES.timesheetPeriodId);
    console.log({
        ...payload.data,
        timesheetPeriodId: timesheetPeriodId
    });
    yield call(postTimeSheetDetails, {
        ...payload.data,
        timesheetPeriodId: timesheetPeriodId
    });
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

export function* saveTimeSheetSaga() {
  yield takeLatest(
    TimeSheetType.SAVE_TIMESHEET_DATA,
    workerSaveTimeSheetSaga
  );
};
