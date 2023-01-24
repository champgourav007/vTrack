import { call, put, takeLatest } from "redux-saga/effects";
import { getProjectAllocationDetails } from "../http/requests/project-allocation";
import {
  ProjectAllocationType,
  setProjectAllocationData,
  setVtrackLoader,
} from "../redux/actions";

function* workerProjectAllocationSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));
    yield put(setProjectAllocationData(null));
    const projectAllocationDetails = yield call(
      getProjectAllocationDetails,
      payload.pageNo,
      payload.pageSize,
      payload.sortDir,
      payload.sortBy,
      payload.searchData,
      payload.status
    );
    yield put(setProjectAllocationData(projectAllocationDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
}

export function* projectAllocationSaga() {
  yield takeLatest(
    ProjectAllocationType.GET_PROJECT_ALLOCATION_DATA,
    workerProjectAllocationSaga
  );
}
