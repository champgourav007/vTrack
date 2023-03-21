import { call, put, takeLatest } from "redux-saga/effects";
import { syncAzureData } from "../http/requests/settings";
import { toastOptions } from "../common/utils/toasterOptions";
import { toast } from "react-toastify";
import { getSettingTableData,  SettingDataType, setVtrackLoader } from "../redux/actions";


function* workerSyncAzureData({payload}) {
  try {
    yield put(setVtrackLoader(true));
    yield call(syncAzureData);
    toast.success("Successfully Synced Data.", toastOptions)
    yield put(getSettingTableData());
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    toast.error(err.data.errorMessage, toastOptions)
    yield put(setVtrackLoader(false));
  }
};

export function* syncAzureDataSaga() {
  yield takeLatest(
    SettingDataType.SYNC_AZURE_DATA,
    workerSyncAzureData
  );
};
