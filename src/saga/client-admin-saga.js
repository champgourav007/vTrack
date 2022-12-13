import { call, put, takeLatest } from "redux-saga/effects";
import {
  getClientAdminDetails,
  postClientAdminDetails,
} from "../http/requests/client-admin";
import {
  ClientAdminType,
  getClientAdminData,
  setClientAdminData,
} from "../redux/actions";
import { store } from "../redux/store";

function* workerClientAdminSaga({ payload }) {
  const clientAdminDetails = yield call(
    getClientAdminDetails,
    payload.pageNo,
    payload.pageSize
  );
  yield put(setClientAdminData(clientAdminDetails));
}

export function* clientAdminSaga() {
  yield takeLatest(
    ClientAdminType.GET_CLIENT_ADMIN_DATA,
    workerClientAdminSaga
  );
}

function* workerSaveClientAdminSaga({ payload }) {
  yield call(postClientAdminDetails, payload.data);
  // const clientAdminData = store.getState().CLIENT_ADMIN_DATA.clientAdminData;
  yield put(getClientAdminData({ pageNo: 1, pageSize: 10 }));
  // yield put(setClientAdminData(payload.data));
}

export function* saveClientAdminSaga() {
  yield takeLatest(
    ClientAdminType.SAVE_CLIENT_ADMIN_DATA,
    workerSaveClientAdminSaga
  );
}
