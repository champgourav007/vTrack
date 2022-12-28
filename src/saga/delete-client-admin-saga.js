import { call, put, takeLatest } from "redux-saga/effects";
import { deleteClientAdminDetails } from "../http/requests/client-admin";
import { ClientAdminType, getClientAdminData, setVtrackLoader } from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";

function* workerDeleteClientAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(deleteClientAdminDetails, payload.clientId);
    toast.success("Data Deleted", toastOptions)
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
    toast.error("Something Went Wrong", toastOptions)
    yield put(setVtrackLoader(false));
  }
};

export function* deleteClientAdminSaga() {
  yield takeLatest(
    ClientAdminType.DELETE_CLIENT_ADMIN_DATA,
    workerDeleteClientAdminSaga
  );
};
