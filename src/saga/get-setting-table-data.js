import { call, put, takeLatest } from "redux-saga/effects";
import { getSettingUserData } from "../http/requests/settings";
import { setSettingTableData, SettingDataType, setVtrackLoader } from "../redux/actions";


function* workerGetSettingTableData() {
  try {
    yield put(setVtrackLoader(true));
    // yield put(setSettingTableData(null));
    const userData = yield call(getSettingUserData);
    yield put(setSettingTableData(userData));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* getSettingTableDataSaga() {
  yield takeLatest(
    SettingDataType.GET_SETTING_TABLE_DATA,
    workerGetSettingTableData
  );
};
