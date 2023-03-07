import { call, put, takeLatest } from "redux-saga/effects";
import { getNotifications } from "../http/requests/user";
import { setVtrackLoader } from "../redux/actions";
import { setNotificationsList, UserType } from "../redux/actions/user";


function* workerGetNotifications(){
  try{
    yield put(setVtrackLoader(true));
    const notificationsList = yield call(
      getNotifications
    );
    yield put(setNotificationsList(notificationsList));
    yield put(setVtrackLoader(false));
  } catch(err){
    console.log(err);
    yield put(setVtrackLoader(false));
  }
}

export function* getNotificationssaga() {
  yield takeLatest(
    UserType.GET_NOTIFICATIONS,
    workerGetNotifications
  );
};