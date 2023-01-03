import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { updateTimeSheetDetails } from "../http/requests/timesheet";
import {
  TimeSheetType,
  getTimeSheetData,
  setVtrackLoader,
  getMyTimeSheetData,
} from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";

function* workerUpdateTimeSheetSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(updateTimeSheetDetails, payload.data);
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
    toast.error("Something Went Wrong", toastOptions)
    yield put(setVtrackLoader(false));
  }
}

export function* updateTimeSheetSaga() {
  yield takeLatest(
    TimeSheetType.UPDATE_TIMESHEET_DATA,
    workerUpdateTimeSheetSaga
  );
}
