import { call, put, takeLatest } from "redux-saga/effects";
import { postClientAdminFile } from "../http/requests/client-admin";
import { ClientAdminType, getClientAdminData, getClientsData, setVtrackLoader } from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";

function* workerSaveClientAdminFileSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(postClientAdminFile, payload.data);
    toast.success("Data Saved", toastOptions)
    yield put(
      getClientAdminData({
        pageNo: payload.data.pageNo+1,
        pageSize: payload.data.rows,
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

export function* saveClientAdminFileSaga() {
  yield takeLatest(
    ClientAdminType.SAVE_CLIENT_ADMIN_FILE_DATA,
    workerSaveClientAdminFileSaga
  );
};
