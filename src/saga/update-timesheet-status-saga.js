import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { updateTimeSheetStatusDetails } from "../http/requests/timesheet";
import {
  TimeSheetType,
  getTimeSheetData,
  setVtrackLoader,
} from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";

function* workerUpdateTimeSheetStatusSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(updateTimeSheetStatusDetails, payload);
    toast.success("Data Updated", toastOptions)
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
    toast.error("Something Went Wrong", toastOptions)
    yield put(setVtrackLoader(false));
  }
}

export function* updateTimeSheetStatusSaga() {
  yield takeLatest(
    TimeSheetType.UPDATE_TIMESHEET_STATUS,
    workerUpdateTimeSheetStatusSaga
  );
}
