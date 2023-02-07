import { toast } from "react-toastify";
import { call, put, select, takeLatest } from "redux-saga/effects";
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
    const projectManagerId = yield select(state=>
      state.USER.userData.data.activeUsers.id);
    yield call(updateTimeSheetStatusDetails, payload);
    toast.success("Data Updated", toastOptions);
    const selectedEmployeeId = yield select(state=>
        state.MODULES.selectedEmployeeId);
    const selectedProjectId = yield select(state=>
        state.MODULES.selectedProjectId);
    yield put(
        getTimeSheetData({
          // periodWeek: periodWeek.startDate.format(DATE_FORMAT) + ' - ' + periodWeek.endDate.format(DATE_FORMAT),
          employeeId: selectedEmployeeId,
          projectId: selectedProjectId,
          projectManagerId: projectManagerId
        })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    toast.error(err.data.errorMessage, toastOptions)
    yield put(setVtrackLoader(false));
  }
}

export function* updateTimeSheetStatusSaga() {
  yield takeLatest(
    TimeSheetType.UPDATE_TIMESHEET_STATUS,
    workerUpdateTimeSheetStatusSaga
  );
}
