import { toast } from "react-toastify";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { toastOptions } from "../common/utils/toasterOptions";
import { saveUserRoles } from "../http/requests/settings";
import { getSettingTableData, SettingDataType, setVtrackLoader } from "../redux/actions";

function* workerSaveUserRoleSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));    
    yield call(saveUserRoles, payload);
    toast.success("Data Saved", toastOptions)
    yield put(getSettingTableData());
    yield put(setVtrackLoader(false));
  } catch (err) {
    yield put(setVtrackLoader(false));
    toast.error("Something Went Wrong", toastOptions)
  }
};

export function* saveUserRoleSaga() {
  yield takeLatest(
    SettingDataType.SAVE_USER_ROLE_DATA,
    workerSaveUserRoleSaga
  );
};
