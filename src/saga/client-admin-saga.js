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
  try {
    const clientAdminDetails = yield call(getClientAdminDetails, payload.pageNo, payload.pageSize);
    yield put(setClientAdminData(clientAdminDetails));
  } catch(err) {
    console.log(err);
  }
}

export function* clientAdminSaga() {
  yield takeLatest(
    ClientAdminType.GET_CLIENT_ADMIN_DATA,
    workerClientAdminSaga
  );
}

function* workerSaveClientAdminSaga({ payload }) {
  yield call(postClientAdminDetails, payload.data);
  yield put(getClientAdminData({ pageNo: 1, pageSize: 10 }));
}

export function* saveClientAdminSaga() {
  yield takeLatest(
    ClientAdminType.SAVE_CLIENT_ADMIN_DATA,
    workerSaveClientAdminSaga
  );
}
