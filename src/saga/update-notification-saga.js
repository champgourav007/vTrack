import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { toastOptions } from "../common/utils/toasterOptions";
import { getNotifications, updateNotification } from "../http/requests/user";
import { setTableLoader, setVtrackLoader } from "../redux/actions";
import { setNotificationsList, UserType } from "../redux/actions/user";


function* workerUpdateNotification({ payload }){
  try{
    // yield put(setVtrackLoader(true));
    yield put(setTableLoader(true));
    const response = yield call(
      updateNotification,
      payload
    );
    toast.success(response.message, toastOptions);
    const notificationsList = yield call(
      getNotifications
    );
    yield put(setNotificationsList(notificationsList));
    yield put(setTableLoader(false));
  } catch(err){
    toast.error(err.data.errorMessage, toastOptions);
    yield put(setTableLoader(false));
  }
}

export function* updateNotificationsaga() {
  yield takeLatest(
    UserType.UPDATE_NOTIFICATION,
    workerUpdateNotification
  );
};