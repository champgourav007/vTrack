import { call, put, takeLatest } from "redux-saga/effects";
import { postProjectAdminDetails, postProjectAdminFile } from "../http/requests/project-admin";
import { getProjectAdminData, ProjectAdminType, setVtrackLoader } from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";

function* workerSaveProjectAdminFileSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(postProjectAdminFile, payload.data);
    toast.success("Data Saved", toastOptions)
    yield put(
      getProjectAdminData({
        pageNo: payload.data.pageNo+1,
        pageSize: payload.data.rows,
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

export function* saveProjectAdminFileSaga() {
  yield takeLatest(
    ProjectAdminType.SAVE_PROJECT_ADMIN_FILE_DATA,
    workerSaveProjectAdminFileSaga
  );
};
