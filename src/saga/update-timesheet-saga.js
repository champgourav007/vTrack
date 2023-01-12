import { toast } from "react-toastify";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { getTimeSheetDetails, updateTimeSheetDetails } from "../http/requests/timesheet";
import {
  TimeSheetType,
  getTimeSheetData,
  setVtrackLoader,
  getMyTimeSheetData,
  setDetailedTimeSheetData,
} from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";

function* workerUpdateTimeSheetSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    const timesheetPeriodWeek = yield select(state=>
      state.MODULES.timesheetPeriodWeek);
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
    const detailedTimeSheetDetails = yield call(
      getTimeSheetDetails,
      payload.data.periodWeek ? payload.data.periodWeek : timesheetPeriodWeek,
      payload.data.projectId ? payload.data.projectId : 0,
      payload.data.employeeId ? payload.data.employeeId : "",
      ""
    );
    yield put(setDetailedTimeSheetData(detailedTimeSheetDetails));
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
