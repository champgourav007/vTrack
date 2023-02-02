import { call, put, takeLatest } from "redux-saga/effects";
import { deleteTimeSheetDetails } from "../http/requests/timesheet";
import { TimeSheetType, getTimeSheetData, setVtrackLoader, getMyTimeSheetData } from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";

function* workerDeleteTimeSheetSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(deleteTimeSheetDetails, payload.timeSheetDetailId);
    toast.success("Data Deleted", toastOptions)
    yield put(
        getMyTimeSheetData({
          // periodWeek: periodWeek.startDate.format(DATE_FORMAT) + ' - ' + periodWeek.endDate.format(DATE_FORMAT),
          pageNo: 1,
          pageSize: 10,
          sortDir: "ASC",
        })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    toast.error(err.data.errorMessage, toastOptions)
    yield put(setVtrackLoader(false));
  }
};

export function* deleteTimeSheetSaga() {
  yield takeLatest(
    TimeSheetType.DELETE_TIMESHEET_DATA,
    workerDeleteTimeSheetSaga
  );
};
