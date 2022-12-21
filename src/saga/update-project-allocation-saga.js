import { call, put, takeLatest } from "redux-saga/effects";
import { updateProjectAllocationDetails } from "../http/requests/project-allocation";
import {
  getProjectAllocationData,
  ProjectAllocationType,
  setVtrackLoader,
} from "../redux/actions";

function* workerUpdateProjectAllocationSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(updateProjectAllocationDetails, payload.data);
    yield put(
      getProjectAllocationData({
        pageNo: 1,
        pageSize: 10,
        sortDir: "ASC",
        sortBy: "projectName",
        searchData: "",
      })
    );
    yield put(setVtrackLoader(false));
  } catch (err) {
    yield put(setVtrackLoader(false));
  }
}

export function* updateProjectAllocationSaga() {
  yield takeLatest(
    ProjectAllocationType.UPDATE_PROJECT_ALLOCATION_DATA,
    workerUpdateProjectAllocationSaga
  );
}
