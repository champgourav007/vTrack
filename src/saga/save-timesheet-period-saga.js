import { call, put, select, takeLatest, takeLeading } from "redux-saga/effects";
import { postTimeSheetPeriod } from "../http/requests/timesheet";
import { TimeSheetType, getTimeSheetData, setVtrackLoader, setTimeSheetPeriodId, getMyTimeSheetData } from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";

function* workerSaveTimeSheetPeriodSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    const employeeID = yield select(state=>
        state.USER.userData.data.activeUsers.id);
    // const periodWeek = yield select(state=>
    //     state.MODULES.timesheetPeriodWeek);
    const data = yield call(postTimeSheetPeriod, { ...payload.data, employeeID: employeeID});
    yield put(setTimeSheetPeriodId(data.timesheetPeriodId))
    yield put(
      getMyTimeSheetData({
        periodWeek: payload.data.periodWeek,
      })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    yield put(setVtrackLoader(false));
  }
};

export function* saveTimeSheetPeriodSaga() {
  yield takeLeading(
    TimeSheetType.SAVE_TIMESHEET_PERIOD_DATA,
    workerSaveTimeSheetPeriodSaga
  );
};
