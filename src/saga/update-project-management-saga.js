import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { updateProjectManagementDetails } from "../http/requests/project-management";
import {
  setVtrackLoader,
} from "../redux/actions";
import { getProjectManagementData, ProjectManagementType } from "../redux/actions/project-management";
import { toastOptions } from "../common/utils/toasterOptions";

function* workerUpdateProjectManagementSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(updateProjectManagementDetails, payload.data);
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
    toast.error("Something Went Wrong", toastOptions)
    yield put(setVtrackLoader(false));
  }
}

export function* updateProjectManagementSaga() {
  yield takeLatest(
    ProjectManagementType.UPDATE_PROJECT_MANAGEMENT_DATA,
    workerUpdateProjectManagementSaga
  );
}
