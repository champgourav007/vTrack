import { call, put, takeLatest } from "redux-saga/effects";
import { deleteSettingUserData } from "../http/requests/settings";
import { getSettingTableData, getUnregisteredUserDetails, SettingDataType, setVtrackLoader } from "../redux/actions";


function* workerDeleteSettingTableData({payload}) {
  try {
    yield put(setVtrackLoader(true));
    yield call(deleteSettingUserData,payload );
    yield put(getSettingTableData());
    yield put(getUnregisteredUserDetails());
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* deleteSettingTableDataSaga() {
  yield takeLatest(
    SettingDataType.DELETE_SETTING_TABLE_DATA,
    workerDeleteSettingTableData
  );
};
