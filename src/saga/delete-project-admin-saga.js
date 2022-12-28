import { call, put, takeLatest } from "redux-saga/effects";
import { deleteProjectAdminDetails } from "../http/requests/project-admin";
import { getProjectAdminData, ProjectAdminType, setVtrackLoader } from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";

function* workerDeleteProjectAdminSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(deleteProjectAdminDetails, payload.projectId);
    toast.success("Data Deleted", toastOptions)
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
    console.log(err);
    toast.error("Something Went Wrong", toastOptions)
    yield put(setVtrackLoader(false));
  }
};

export function* deleteProjectAdminSaga() {
  yield takeLatest(
    ProjectAdminType.DELETE_PROJECT_ADMIN_DATA,
    workerDeleteProjectAdminSaga
  );
};
