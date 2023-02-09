import { call, put, takeLatest } from "redux-saga/effects";
import { deleteProjectManagementDetail } from "../http/requests/project-management";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";
import { setVtrackLoader } from "../redux/actions";
import { getProjectManagementData, ProjectManagementType } from "../redux/actions/project-management";


function* workerDeleteProjectManagementData({payload}) {
  try {
    yield put(setVtrackLoader(true));
    yield call(deleteProjectManagementDetail, payload.data.projectAllocationId );
    toast.success("Data Deleted", toastOptions)
    yield put(getProjectManagementData({
        projectId: payload.data.projectId,
        pageNo: 1,
        pageSize: 10,
        sortDir: "ASC",
        sortBy: "projectName",
        searchData: "",
      }));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    toast.error(err.data.errorMessage, toastOptions)
    yield put(setVtrackLoader(false));
  }
};

export function* deleteProjectManagementData() {
  yield takeLatest(
    ProjectManagementType.DELETE_PROJECT_MANAGEMENT_DATA,
    workerDeleteProjectManagementData
  );
};
