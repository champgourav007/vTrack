import { call, put, takeLatest } from "redux-saga/effects";
import {
  getClientAdminDetails,
  postClientAdminDetails,
  updateClientAdminDetails,
} from "../http/requests/client-admin";
import {
  ClientAdminType,
  getClientAdminData,
  setClientAdminData,
} from "../redux/actions";

function* workerClientAdminSaga({ payload }) {
  try {
    const clientAdminDetails = yield call(
      getClientAdminDetails,
      payload.pageNo,
      payload.pageSize,
      payload.sortDir,
      payload.sortBy
    );
    yield put(setClientAdminData(clientAdminDetails));
  } catch (err) {
    console.log(err);
  }
}

function* workerSaveClientAdminSaga({ payload }) {
  yield call(postClientAdminDetails, payload.data);
  yield put(
    getClientAdminData({
      pageNo: 1,
      pageSize: 10,
      sortDir: "ASC",
      sortBy: "clientName",
    })
  );
}

function* workerUpdateClientAdminSaga({ payload }) {
  yield call(updateClientAdminDetails, payload.data);
  yield put(
    getClientAdminData({
      pageNo: 1,
      pageSize: 10,
      sortDir: "ASC",
      sortBy: "clientName",
    })
  );
}

export function* clientAdminSaga() {
  yield takeLatest(
    ClientAdminType.GET_CLIENT_ADMIN_DATA,
    workerClientAdminSaga
  );
}

export function* saveClientAdminSaga() {
  yield takeLatest(
    ClientAdminType.SAVE_CLIENT_ADMIN_DATA,
    workerSaveClientAdminSaga
  );
}

export function* updateClientAdminSaga() {
  yield takeLatest(
    ClientAdminType.UPDATE_CLIENT_ADMIN_DATA,
    workerUpdateClientAdminSaga
  );
}
