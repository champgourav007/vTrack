import { allTasks, timeSheetData } from "../../mock-data/TableData";
import { ClientAdminType, DropdownType, ProjectAdminType, ProjectAllocationType, SettingDataType } from "../actions"
import { ProjectManagementType } from "../actions/project-management";
import { TimeSheetType } from "../actions/timesheet";

export const modulesState = {
  clientAdminData: null,
  projectAdminData: null,
  projectAllocationData: null,
  timeSheetData: null,
  timesheetPeriodId: 0,
  clientsData: null,
  projectManagers: null,
  listItems: null,
  allTasks: allTasks,
  allUsers: null,
  allProjectsData: null,
  userRole: null,
  projectManagementData: null,
  settingTableData:null
}

export const modulesReducer = (state = modulesState, action) => {
  switch(action.type) {
    case ClientAdminType.SET_CLIENT_ADMIN_DATA:
      return {
        ...state,
        clientAdminData: action.payload,
      };
    case TimeSheetType.SET_TIMESHEET_DATA:
      return {
        ...state,
        timeSheetData: action.payload,
      };
    case ProjectAdminType.SET_PROJECT_ADMIN_DATA:
      return {
        ...state,
        projectAdminData: action.payload,
      }
    case ProjectAllocationType.SET_PROJECT_ALLOCATION_DATA:
      return {
        ...state,
        projectAllocationData: action.payload,
      }
    case DropdownType.SET_ALL_CLIENTS_DATA:
      return {
        ...state,
        clientsData: action.payload,
      }
    case DropdownType.SET_PROJECT_MANAGERS_DATA:
      return {
        ...state,
        projectManagers: action.payload,
      }
    case DropdownType.SET_LIST_ITEMS:
      return {
        ...state,
        listItems: action.payload,
      }
    case DropdownType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      }
    case DropdownType.SET_ALL_PROJECTS_DATA:
      return {
        ...state,
        allProjectsData: action.payload,
      }
    case SettingDataType.SET_USER_ROLE_DATA:
      return {
        ...state,
        userRole: action.payload
      }
    case ProjectManagementType.SET_PROJECT_MANAGEMENT_DATA:
      return {
        ...state,
        projectManagementData: action.payload
      }
    case SettingDataType.SET_SETTING_TABLE_DATA:
      return {
        ...state,
        settingTableData: action.payload
      }
    case TimeSheetType.SET_TIMESHEET_PERIOD_ID:
      return {
        ...state,
        timesheetPeriodId: action.payload
      }
    default: return state;
  }
};
