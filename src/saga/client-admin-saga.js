import { call, put, takeLatest } from "redux-saga/effects";
import { getClientAdminDetails } from "../http/requests/client-admin";
import { ClientAdminType, setClientAdminData } from "../redux/actions";

function* workerClientAdminSaga({ payload }) {
  const clientAdminDetails = yield call(getClientAdminDetails, payload.pageNo, payload.pageSize);
  yield put(setClientAdminData(clientAdminDetails));
}

export function* clientAdminSaga() {
  yield takeLatest(ClientAdminType.GET_CLIENT_ADMIN_DATA, workerClientAdminSaga); 
}