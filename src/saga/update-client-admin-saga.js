import { call, put, takeLatest } from "redux-saga/effects";
import { updateClientAdminDetails } from "../http/requests/client-admin";
import {
  ClientAdminType,
  getClientAdminData,
  setVtrackLoader,
} from "../redux/actions";

function* workerUpdateClientAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(updateClientAdminDetails, payload.data);
    yield put(
      getClientAdminData({
        pageNo: 1,
        pageSize: 10,
        sortDir: "ASC",
        sortBy: "clientName",
        searchData: "",
      })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    yield put(setVtrackLoader(false));
  }
}

export function* updateClientAdminSaga() {
  yield takeLatest(
    ClientAdminType.UPDATE_CLIENT_ADMIN_DATA,
    workerUpdateClientAdminSaga
  );
}
