import { call, put, takeLatest } from "redux-saga/effects";
import { deleteClientAdminDetails } from "../http/requests/client-admin";
import { ClientAdminType, deleteClientAdminData, getClientAdminData } from "../redux/actions";

function* workerDeleteClientAdminSaga({ payload }) {
    yield call(deleteClientAdminDetails, payload.clientId);
    yield put(
      getClientAdminData({
        pageNo: 1,
        pageSize: 10,
        sortDir: "ASC",
        sortBy: "clientName",
      })
    );
  }

export function* deleteClientAdminSaga() {
    yield takeLatest(
      ClientAdminType.DELETE_CLIENT_ADMIN_DATA,
      workerDeleteClientAdminSaga
    );
  }
