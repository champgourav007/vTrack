import { all, fork } from "redux-saga/effects";
import { clientAdminSaga } from "./client-admin-saga";
import { deleteClientAdminSaga } from "./delete-client-admin-saga";
import { deleteProjectAdminSaga } from "./delete-project-admin-saga";
import { deleteSettingTableDataSaga } from "./delete-setting-table-data";
import { allProjectsSaga } from "./get-all-projects-saga";
import { allUsersSaga } from "./get-all-user-saga";
import { allClientsSaga } from "./get-client-saga";
import { listItemsSaga } from "./get-list-items-saga";
import { projectManagersSaga } from "./get-project-managers-saga";
import { getSettingTableDataSaga } from "./get-setting-table-data";
import { getRolesSaga } from "./get-user-roles-setting-saga";
import { projectAdminSaga } from "./project-admin-saga";
import { projectAllocationSaga } from "./project-allocation-saga";
import { saveClientAdminSaga } from "./save-client-admin-saga";
import { saveProjectAdminSaga } from "./save-project-admin-saga";
import { saveProjectAllocationSaga } from "./save-project-allocation-saga";
import { saveUserRoleSaga } from "./save-user-roles-setting-saga";
import { updateClientAdminSaga } from "./update-client-admin-saga";
import { updateProjectAdminSaga } from "./update-project-admin-saga";
import { updateProjectAllocationSaga } from "./update-project-allocation-saga";
import { updateSettingTableDataSaga } from "./update-setting-table-user-role";
import { allUserDetailSaga, userSaga } from "./user-saga";

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
    fork(allUsersSaga),
    fork(projectAllocationSaga),
    fork(updateProjectAllocationSaga),
    fork(saveProjectAllocationSaga),
    fork(allUserDetailSaga),
    fork(allProjectsSaga),
    fork(getRolesSaga),
    fork(saveUserRoleSaga),
    fork(getSettingTableDataSaga),
    fork(deleteSettingTableDataSaga),
    fork(updateSettingTableDataSaga)
  ]);
}
