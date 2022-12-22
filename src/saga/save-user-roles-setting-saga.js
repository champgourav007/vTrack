import { call, put, takeLatest } from "redux-saga/effects";
import { saveUserRoles } from "../http/requests/settings";
import { SettingDataType, setVtrackLoader } from "../redux/actions";

function* workerSaveUserRoleSaga({ payload }) {
  try {
    yield put(setVtrackLoader(true));    
    yield call(saveUserRoles, payload);
    // yield put(
    //   saveUserRoles({
        
    //   })
    // );
    yield put(setVtrackLoader(false));
  } catch (err) {
    yield put(setVtrackLoader(false));
  }
};

export function* saveUserRoleSaga() {
  yield takeLatest(
    SettingDataType.SAVE_USER_ROLE_DATA,
    workerSaveUserRoleSaga
  );
};
