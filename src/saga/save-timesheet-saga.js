import { call, put, select, takeLatest } from "redux-saga/effects";
import { postTimeSheetDetails } from "../http/requests/timesheet";
import { TimeSheetType, getTimeSheetData, setVtrackLoader, getMyTimeSheetData } from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";

function* workerSaveTimeSheetSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    const timesheetPeriodId = yield select(state=>
        state.MODULES.timesheetPeriodId);
    yield call(postTimeSheetDetails, {
        ...payload.data,
        timesheetPeriodId: timesheetPeriodId
    });
    toast.success("Data Saved", toastOptions)
    yield put(
      getMyTimeSheetData({
        // periodWeek: periodWeek.startDate.format('DD MMM') + ' - ' + periodWeek.endDate.format('DD MMM'),
        pageNo: 1,
        pageSize: 10,
        sortDir: "ASC",
      })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    toast.error(err.data.errorMessage, toastOptions)
    yield put(setVtrackLoader(false));
  }
};

export function* saveTimeSheetSaga() {
  yield takeLatest(
    TimeSheetType.SAVE_TIMESHEET_DATA,
    workerSaveTimeSheetSaga
  );
};
