import { call, put, takeLatest } from "redux-saga/effects";
import { postClientAdminDetails } from "../http/requests/client-admin";
import { ClientAdminType, getClientAdminData, getClientsData, setVtrackLoader } from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";

function* workerSaveClientAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(postClientAdminDetails, payload.data);
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
    yield put(getClientsData());
    yield put(setVtrackLoader(false));
  } catch (err) {
    toast.error(err.data.errorMessage, toastOptions)
    yield put(setVtrackLoader(false));
  }
};

export function* saveClientAdminSaga() {
  yield takeLatest(
    ClientAdminType.SAVE_CLIENT_ADMIN_DATA,
    workerSaveClientAdminSaga
  );
};
