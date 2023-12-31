import { all, fork } from "redux-saga/effects";
import { clientAdminSaga } from "./client-admin-saga";
import { deleteClientAdminSaga } from "./delete-client-admin-saga";
import { deleteProjectAdminSaga } from "./delete-project-admin-saga";
import { deleteProjectManagementData } from "./delete-project-management-data";
import { deleteSettingTableDataSaga } from "./delete-setting-table-data";
import { deleteTimeSheetSaga } from "./delete-timesheet-saga";
import { allProjectsSaga } from "./get-all-projects-saga";
import { allUsersSaga } from "./get-all-user-saga";
import { assignedProjectsSaga } from "./get-assigned-projects-saga";
import { allClientsSaga } from "./get-client-saga";
import { detailedTimeSheetSaga } from "./get-detailed-timesheet-saga";
import { listItemsSaga } from "./get-list-items-saga";
import { mappedProjectManagementSaga } from "./get-mapped-project-management-data";
import { getMissingTimesheetsaga } from "./get-missing-timesheet-saga";
import { getNotificationssaga } from "./get-notifications-saga";
import { projectManagementSaga } from "./get-project-management-saga";
import { projectManagersSaga } from "./get-project-managers-saga";
import { projectTasksSaga } from "./get-project-tasks";
import { getReporteesSaga } from "./get-reportees-saga";
import { getSettingTableDataSaga } from "./get-setting-table-data";
import { getTimesheetProjectsSaga } from "./get-timesheet-projects";
import { timeSheetReporteeSaga } from "./get-timesheet-reportee-saga";
import { getTimesheetReportsSaga } from "./get-timesheet-reports";
import { getUnRegisteredUsersSaga } from "./get-unregistered-user-details-saga";
import { getRolesSaga } from "./get-user-roles-setting-saga";
import { myTimeSheetSaga } from "./my-timesheet-saga";
import { projectAdminSaga } from "./project-admin-saga";
import { projectAllocationSaga } from "./project-allocation-saga";
import { saveClientAdminFileSaga } from "./save-client-admin-file-saga";
import { saveClientAdminSaga } from "./save-client-admin-saga";
import { saveProjectAdminFileSaga } from "./save-project-admin-file-saga";
import { saveProjectAdminSaga } from "./save-project-admin-saga";
import { saveProjectManagementSaga } from "./save-project-management-data";
import { saveTimeSheetPeriodSaga } from "./save-timesheet-period-saga";
import { saveTimeSheetSaga } from "./save-timesheet-saga";
import { saveUserRoleSaga } from "./save-user-roles-setting-saga";
import { submitPeriodSaga } from "./submit-period-saga";
import { syncAzureDataSaga } from "./sync-azure-data-saga";
import { timeSheetSaga } from "./timesheet-saga";
import { updateClientAdminSaga } from "./update-client-admin-saga";
import { updateNotificationForUserSaga } from "./update-notification-for-user-saga";
import { updateNotificationsaga } from "./update-notification-saga";
import { updateProjectAdminSaga } from "./update-project-admin-saga";
import { updateProjectManagementSaga } from "./update-project-management-saga";
import { updateSettingTableDataSaga } from "./update-setting-table-user-role";
import { updateTimeSheetSaga } from "./update-timesheet-saga";
import { updateTimeSheetStatusSaga } from "./update-timesheet-status-saga";
import { allUserDetailSaga, userSaga } from "./user-saga";

export function* rootSaga() {
  yield all([
    fork(clientAdminSaga),
    fork(getReporteesSaga),
    fork(myTimeSheetSaga),
    fork(timeSheetSaga),
    fork(submitPeriodSaga),
    fork(saveClientAdminSaga),
    fork(saveTimeSheetSaga),
    fork(saveTimeSheetPeriodSaga),
    fork(updateClientAdminSaga),
    fork(updateTimeSheetSaga),
    fork(updateTimeSheetStatusSaga),
    fork(deleteTimeSheetSaga),
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
    fork(allUserDetailSaga),
    fork(allProjectsSaga),
    fork(getRolesSaga),
    fork(saveUserRoleSaga),
    fork(projectManagementSaga),
    fork(saveProjectManagementSaga),
    fork(updateProjectManagementSaga),
    fork(getSettingTableDataSaga),
    fork(deleteSettingTableDataSaga),
    fork(updateSettingTableDataSaga),
    fork(mappedProjectManagementSaga),
    fork(getUnRegisteredUsersSaga),
    fork(projectTasksSaga),
    fork(assignedProjectsSaga),
    fork(detailedTimeSheetSaga),
    fork(timeSheetReporteeSaga),
    fork(getTimesheetProjectsSaga),
    fork(saveClientAdminFileSaga),
    fork(saveProjectAdminFileSaga),
    fork(deleteProjectManagementData),
    fork(getTimesheetReportsSaga),
    fork(getMissingTimesheetsaga),
    fork(getNotificationssaga),
    fork(updateNotificationsaga),
    fork(syncAzureDataSaga),
    fork(updateNotificationForUserSaga),
  ]);
}
