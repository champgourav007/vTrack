import { call, put, takeLatest } from "redux-saga/effects";
import { postClientAdminDetails } from "../http/requests/client-admin";
import { ClientAdminType, getClientAdminData, setVtrackLoader } from "../redux/actions";

function* workerSaveClientAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(postClientAdminDetails, payload.data);
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
    yield put(setVtrackLoader(false));
  }
};

export function* saveClientAdminSaga() {
  yield takeLatest(
    ClientAdminType.SAVE_CLIENT_ADMIN_DATA,
    workerSaveClientAdminSaga
  );
};
