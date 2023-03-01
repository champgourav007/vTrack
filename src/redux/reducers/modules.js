import { ClientAdminType, DropdownType, ProjectAdminType, ProjectAllocationType, SettingDataType } from "../actions"
import { ProjectManagementType } from "../actions/project-management";
import { ReportingType } from "../actions/reporting";
import { TimeSheetType } from "../actions/timesheet";

export const modulesState = {
  clientAdminData: null,
  projectAdminData: null,
  projectAllocationData: null,
  timeSheetData: null,
  timesheetPeriodId: 0,
  timesheetPeriodWeek: "",
  clientsData: null,
  projectManagers: null,
  listItems: null,
  allTasks: null,
  allUsers: null,
  allProjectsData: null,
  userRole: null,
  projectManagementData: null,
  settingTableData:null,
  mappedProjectManagementData:null,
  assignedProjects: null,
  reportees: null,
  selectedEmployeeId: null,
  selectedProjectId: null,
  detailedTimeSheetData: null,
  timeSheetProjects: null,
  reportingData: null
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
    case TimeSheetType.SET_TIMESHEET_PERIOD_WEEK:
      return {
        ...state,
        timesheetPeriodWeek: action.payload
      }
    case ProjectManagementType.SET_MAPPED_PROJECT_MANAGEMENT_DATA:
      return{
        ...state,
        mappedProjectManagementData: action.payload
      }  
    case TimeSheetType.SET_PROJECT_TASKS_DATA:
      return {
        ...state,
        allTasks: action.payload
      }
    case TimeSheetType.SET_SELECTED_PROJECT_ID:
      return {
        ...state,
        selectedProjectId: action.payload
      }
    case TimeSheetType.SET_SELECTED_EMPLOYEE_ID:
      return {
        ...state,
        selectedEmployeeId: action.payload
      }
    case DropdownType.SET_ASSIGNED_PROJECTS_DATA:
      return {
        ...state,
        assignedProjects: action.payload
      }
    case DropdownType.SET_REPORTEES:
      return {
        ...state,
        reportees: action.payload
      }
    case DropdownType.SET_TIMESHEET_PROJECTS:
      return {
        ...state,
        timeSheetProjects: action.payload
      }
    case TimeSheetType.SET_DETAILED_TIMESHEET_DATA:
      return {
        ...state,
        detailedTimeSheetData: action.payload
      }
    case ReportingType.SET_REPORTING_DATA:
      return{
        ...state,
        reportingData: action.payload
      }
    default: return state;
  }
};
