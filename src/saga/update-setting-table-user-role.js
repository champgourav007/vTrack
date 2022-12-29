import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import {updateSettingUserRole } from "../http/requests/settings";
import { getSettingTableData, SettingDataType, setVtrackLoader } from "../redux/actions";
import { toastOptions } from "../common/utils/toasterOptions";

function* workerUpdateSettingTableData({payload}) {
  try {
    yield put(setVtrackLoader(true));
    yield call(updateSettingUserRole, payload.userId, payload.roleId );
    toast.success("Data Saved", toastOptions)
    yield put(getSettingTableData());
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    toast.error("Something Went Wrong", toastOptions)
    yield put(setVtrackLoader(false));
  }
};

export function* updateSettingTableDataSaga() {
  yield takeLatest(
    SettingDataType.UPDATE_SETTING_TABLE_DATA,
    workerUpdateSettingTableData
  );
};
