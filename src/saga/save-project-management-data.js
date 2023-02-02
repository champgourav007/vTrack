import { call, put, takeLatest } from "redux-saga/effects";
import { postProjectManagementDetails } from "../http/requests/project-management";
import {
  setVtrackLoader,
} from "../redux/actions";
import { getProjectManagementData, ProjectManagementType } from "../redux/actions/project-management";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";

function* workerSaveProjectManagementSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(postProjectManagementDetails, payload.data);
    toast.success("Data Saved", toastOptions)
    yield put(
        getProjectManagementData({
        projectId: payload.data.projectId,
        pageNo: 1,
        pageSize: 10,
        sortDir: "ASC",
        sortBy: "projectName",
        searchData: "",
      })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    toast.error(err.data.errorMessage, toastOptions)
    yield put(setVtrackLoader(false));
  }
}

export function* saveProjectManagementSaga() {
  yield takeLatest(
    ProjectManagementType.SAVE_PROJECT_MANAGEMENT_DATA,
    workerSaveProjectManagementSaga
  );
}
