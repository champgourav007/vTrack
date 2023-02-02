import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { updateProjectAdminDetails } from "../http/requests/project-admin";
import { getProjectAdminData, ProjectAdminType, setVtrackLoader } from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";

function* workerUpdateProjectAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(updateProjectAdminDetails, payload.data);
    toast.success("Data Saved", toastOptions)
    yield put(
      getProjectAdminData({
        pageNo: 1,
        pageSize: 10,
        sortDir: "ASC",
        sortBy: "projectName",
        searchData: ''
      })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    toast.error(err.data.errorMessage, toastOptions)
    yield put(setVtrackLoader(false));
  }
};

export function* updateProjectAdminSaga() {
  yield takeLatest(
    ProjectAdminType.UPDATE_PROJECT_ADMIN_DATA,
    workerUpdateProjectAdminSaga
  );
};