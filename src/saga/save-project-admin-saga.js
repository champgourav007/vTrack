import { call, put, takeLatest } from "redux-saga/effects";
import { postProjectAdminDetails } from "../http/requests/project-admin";
import { getProjectAdminData, ProjectAdminType, setVtrackLoader } from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";

function* workerSaveProjectAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(postProjectAdminDetails, payload.data);
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
    toast.error("Something Went Wrong", toastOptions)
    yield put(setVtrackLoader(false));
  }
};

export function* saveProjectAdminSaga() {
  yield takeLatest(
    ProjectAdminType.SAVE_PROJECT_ADMIN_DATA,
    workerSaveProjectAdminSaga
  );
};
