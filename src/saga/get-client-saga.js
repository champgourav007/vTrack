import { call, put, takeLatest } from "redux-saga/effects";
import { getAllClients } from "../http/requests/dropdown";
import {
  DropdownType,
  setClientsData,
  setVtrackLoader
} from "../redux/actions";

function* workerAllClientsSaga() {
  try {
    yield put(setVtrackLoader(true));
    const clientDetails = yield call(getAllClients);
    yield put(setClientsData(clientDetails));
    yield put(setVtrackLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setVtrackLoader(false));
  }
};

export function* allClientsSaga() {
  yield takeLatest(
    DropdownType.GET_ALL_CLIENTS_DATA,
    workerAllClientsSaga
  );
};
