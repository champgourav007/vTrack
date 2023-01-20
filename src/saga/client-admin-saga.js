import { call, put, takeLatest } from "redux-saga/effects";
import { getClientAdminDetails } from "../http/requests/client-admin";
import {
  ClientAdminType, 
  getClientsData, 
  setClientAdminData,
  setVtrackLoader
} from "../redux/actions";

function* workerClientAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    const clientAdminDetails = yield call(
      getClientAdminDetails,
      payload.pageNo,
      payload.pageSize,
      payload.sortDir,
      payload.sortBy,
      payload.searchData
    );
    yield put(setClientAdminData(clientAdminDetails));
    // yield put(getClientsData());
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* clientAdminSaga() {
  yield takeLatest(
    ClientAdminType.GET_CLIENT_ADMIN_DATA,
    workerClientAdminSaga
  );
};
