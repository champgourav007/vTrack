import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getSettingTableData,
  SettingDataType,
  setVtrackLoader,
} from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";
import { updateNotificationForUser } from "../http/requests/settings";

function* workerUpdateNotificationForUserSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(updateNotificationForUser, payload.userId);
    toast.success("Data Updated Successfully", toastOptions)
    yield put(getSettingTableData());
    yield put(setVtrackLoader(false));
  } catch (err) {
    toast.error(err.data.errorMessage, toastOptions)
    yield put(setVtrackLoader(false));
  }
}

export function* updateNotificationForUserSaga() {
  yield takeLatest(
    SettingDataType.UPDATE_NOTIFICATION_FOR_USER,
    workerUpdateNotificationForUserSaga
  );
}
