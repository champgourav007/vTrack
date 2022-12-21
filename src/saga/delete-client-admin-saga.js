import { call, put, takeLatest } from "redux-saga/effects";
import { deleteClientAdminDetails } from "../http/requests/client-admin";
import { ClientAdminType, getClientAdminData, setVtrackLoader } from "../redux/actions";

function* workerDeleteClientAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(deleteClientAdminDetails, payload.clientId);
    yield put(
      getClientAdminData({
        pageNo: 1,
        pageSize: 10,
        sortDir: "ASC",
        sortBy: "clientName",
        searchData: ''
      })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* deleteClientAdminSaga() {
  yield takeLatest(
    ClientAdminType.DELETE_CLIENT_ADMIN_DATA,
    workerDeleteClientAdminSaga
  );
};
