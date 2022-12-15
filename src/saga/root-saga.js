import { all, fork } from "redux-saga/effects";
import {
  clientAdminSaga,
  saveClientAdminSaga,
  updateClientAdminSaga,
} from "./client-admin-saga";
import { deleteClientAdminSaga } from "./delete-client-admin-saga";

export function* rootSaga() {
  yield all([
    fork(clientAdminSaga),
    fork(saveClientAdminSaga),
    fork(updateClientAdminSaga),
    fork(deleteClientAdminSaga),
  ]);
}
