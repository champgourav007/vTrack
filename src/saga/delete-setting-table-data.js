import { call, put, takeLatest } from "redux-saga/effects";
import { deleteSettingUserData } from "../http/requests/settings";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";
import { getSettingTableData, getUnregisteredUserDetails, SettingDataType, setVtrackLoader } from "../redux/actions";


function* workerDeleteSettingTableData({payload}) {
  try {
    yield put(setVtrackLoader(true));
    yield call(deleteSettingUserData,payload );
    toast.success("Data Deleted", toastOptions)
    yield put(getSettingTableData());
    yield put(getUnregisteredUserDetails());
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    toast.error("Something Went Wrong", toastOptions)
    yield put(setVtrackLoader(false));
  }
};

export function* deleteSettingTableDataSaga() {
  yield takeLatest(
    SettingDataType.DELETE_SETTING_TABLE_DATA,
    workerDeleteSettingTableData
  );
};
