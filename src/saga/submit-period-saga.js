import { call, put, select, takeLatest } from "redux-saga/effects";
import { getTimeSheetDetails, submitPeriodForApproval } from "../http/requests/timesheet";
import { timeSheetData } from "../mock-data/TableData";
// import { getTimeSheetDetails } from "../http/requests/client-admin";
import {
  TimeSheetType, 
  setTimeSheetData,
  setVtrackLoader,
  getTimeSheetData,
  getMyTimeSheetData
} from "../redux/actions";

function* workerSubmitPeriodSaga() {
  try {
    yield put(setVtrackLoader(true));
    const timesheetPeriodId = yield select(state=>
        state.MODULES.timesheetPeriodId);
    // const employeeID = yield select(state=>
    //     state.USER.userData.data.activeUsers.id);
    const data = yield call(
        submitPeriodForApproval,
        {
            timesheetPeriodId: timesheetPeriodId,
            status: 'Submitted'
        }
    );
    yield put(
        getMyTimeSheetData({
          pageNo: 1,
          pageSize: 10,
          sortDir: "ASC",
        })
      );
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* submitPeriodSaga() {
  yield takeLatest(
    TimeSheetType.SUBMIT_PERIOD_FOR_APPROVAL,
    workerSubmitPeriodSaga
  );
};
