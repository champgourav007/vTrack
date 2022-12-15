import { all, fork } from "redux-saga/effects";
import {
  clientAdminSaga,
  saveClientAdminSaga,
  updateClientAdminSaga,
} from "./client-admin-saga";
import { deleteClientAdminSaga } from "./delete-client-admin-saga";
import { userSaga } from "./user-saga";

export function* rootSaga() {
  yield all([
    fork(clientAdminSaga),
    fork(saveClientAdminSaga),
    fork(updateClientAdminSaga),
    fork(deleteClientAdminSaga),
    fork(userSaga)
  ]);
}
