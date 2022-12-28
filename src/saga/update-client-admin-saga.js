import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { updateClientAdminDetails } from "../http/requests/client-admin";
import {
  ClientAdminType,
  getClientAdminData,
  setVtrackLoader,
} from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";

function* workerUpdateClientAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(updateClientAdminDetails, payload.data);
    toast.success("Data Saved", toastOptions)
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
    toast.error("Something Went Wrong", toastOptions)
    yield put(setVtrackLoader(false));
  }
}

export function* updateClientAdminSaga() {
  yield takeLatest(
    ClientAdminType.UPDATE_CLIENT_ADMIN_DATA,
    workerUpdateClientAdminSaga
  );
}
