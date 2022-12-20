import { all, fork } from "redux-saga/effects";
import { clientAdminSaga } from "./client-admin-saga";
import { deleteClientAdminSaga } from "./delete-client-admin-saga";
import { deleteProjectAdminSaga } from "./delete-project-admin-saga";
import { allUsersSaga } from "./get-all-user-saga";
import { allClientsSaga } from "./get-client-saga";
import { listItemsSaga } from "./get-list-items-saga";
import { projectManagersSaga } from "./get-project-managers-saga";
import { projectAdminSaga } from "./project-admin-saga";
import { saveClientAdminSaga } from "./save-client-admin-saga";
import { saveProjectAdminSaga } from "./save-project-admin-saga";
import { updateClientAdminSaga } from "./update-client-admin-saga";
import { updateProjectAdminSaga } from "./update-project-admin-saga";
import { userSaga } from "./user-saga";

export function* rootSaga() {
  yield all([
    fork(clientAdminSaga),
    fork(saveClientAdminSaga),
    fork(updateClientAdminSaga),
    fork(deleteClientAdminSaga),
    fork(userSaga),
    fork(projectAdminSaga),
    fork(saveProjectAdminSaga),
    fork(updateProjectAdminSaga),
    fork(deleteProjectAdminSaga),
    fork(listItemsSaga),
    fork(allClientsSaga),
    fork(projectManagersSaga),
    fork(allUsersSaga)
  ]);
}
