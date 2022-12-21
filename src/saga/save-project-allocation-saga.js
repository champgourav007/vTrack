import { call, put, takeLatest } from "redux-saga/effects";
import { postProjectAllocationDetails } from "../http/requests/project-allocation";
import {
  getProjectAllocationData,
  ProjectAllocationType,
  setVtrackLoader,
} from "../redux/actions";

function* workerSaveProjectAllocationSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield call(postProjectAllocationDetails, payload.data);
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

export function* saveProjectAllocationSaga() {
  yield takeLatest(
    ProjectAllocationType.SAVE_PROJECT_ALLOCATION_DATA,
    workerSaveProjectAllocationSaga
  );
}
