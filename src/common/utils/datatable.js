import axios from "axios";
import { ACCESS_TOKEN } from "../constants/local-storage-keys";
import { Modules } from "../constants/sidebar";
import { getLocalStorageItem } from "./local-storage";
import Cookies from 'universal-cookie';

export const UniqueIds = {
  ProjectAdmin: 'projectId',
  ClientAdmin: 'clientId',
  ProjectAllocation: 'projectAllocationId',
  Timesheet: 'timesheetDetailID',
  ProjectManagement: 'projectAllocationId'
};

const cookies = new Cookies();

export const tableColumnsData = {
  'ProjectAdmin': [
    { id: "projectName", label: "Project Name", minWidth: 100, type: 'textfield', sortDir: '', align: 'left',isRequired: true, isSort: true },
    { id: "clientName", label: "Client Name", minWidth: 100, type: 'select', sortDir: '', align: 'left',isRequired: true, isSort: true },
    { id: "type", label: "Type", minWidth: 80, type: 'select', sortDir: '', align: 'left', isSort: true },
    { id: "sowStartDate", label: "SOW Start Date", minWidth: 100, type: 'date', sortDir: '', align: 'left', isSort: true },
    { id: "sowEndDate", label: "SOW End Date", minWidth: 110, type: 'date', sortDir: '', align: 'left', isSort: true },
    { id: 'projectManagerName', label: 'Veersa Project Manager', minWidth: 100, type: 'select', sortDir: '', align: 'left', isSort: false },
    {id: 'status', label:'Status', minWidth: 100, type: 'select', align: 'left', isSort: false },
    { id: 'approvers', label: 'Approvers', minWidth: 100, maxWidth: 120, type: 'multi-select', sortDir: '', align: 'left', isSort: false },
    { id: 'actions', label: 'Actions', minWidth: 100, type: 'action', sortDir: '', align: 'left', isSort: false }
  ],
  'ClientAdmin': [
    { id: "clientName", label: "Client Name", minWidth: 100, type: 'textfield', sortDir: '', align: 'left',isRequired: true, isSort: true },
    { id: "location", label: "Client Location", minWidth: 80, type: 'select', sortDir: '', align: 'left', isSort: true },
    { id: "currency", label: "Currency", minWidth: 80, type: 'select', sortDir: '', align: 'left', isSort: true },
    { id: "msaStartDate", label: "MSA Start Date", minWidth: 100, type: 'date', sortDir: '', align: 'left', isSort: true },
    { id: "msaEndDate", label: "MSA End Date", minWidth: 110, type: 'date', sortDir: '', align: 'left', isSort: true },
    { id: "businessOwner", label: "Veersa Business Owner", minWidth: 100, type: 'select', sortDir: '', align: 'left', isSort: false },
    { id: "paymentTerms", label: "Payment Terms", minWidth: 80, type: 'textfield', sortDir: '', align: 'left', isSort: true },
    { id: "deliveryOfficer", label: "Veersa Delivery Officer", minWidth: 100, type: 'select', sortDir: '', align: 'left', isSort: false },
    { id: 'actions', label: 'Actions', minWidth: 100, type: 'action', sortDir: '', align: 'left', isSort: false }
  ],
  'ProjectAllocation': [
    { id: "employeeName", label: "Employee Name", minWidth: 120, type: 'select',  sortDir: '', align: 'left', isSort: false },
    { id: "projectName", label: "Project Name", minWidth: 100, type: 'select', sortDir: '', align: 'left', isSort: true },
    { id: "projectManagerName", label: "Project Manager", minWidth: 80, type: 'select', sortDir: '', align: 'left', isSort: false },
    { id: "startDate", label: "Start Date", minWidth: 100, type: 'date', sortDir: '', align: 'left', isSort: true },
    { id: "endDate", label: "End Date", minWidth: 110, type: 'date', sortDir: '', align: 'left', isSort: true },
    { id: 'billStatus', label: 'Bill Status', minWidth: 100, type: 'textfield', sortDir: '', align: 'left', isSort: false },
    { id: 'billAllocation', label: 'Allocation', minWidth: 100, type: 'textfield', sortDir: '', align: 'left', isSort: false }
    // { id: 'status', label: 'Status', minWidth: 100, type: 'textfield' }
  ], 
  'ProjectManagement': [
    { id: "employeeName", label: "Employee Name", minWidth: 120, type: 'multi-select', sortDir: '',isRequired: true, align: 'left', isSort: false },
    { id: "site", label: "Offshore/Onshore", minWidth: 110, type: 'select', sortDir: '', align: 'left', isSort: false },
    { id: 'startDate', label: 'Start Date', minWidth: 110, type: 'date', sortDir: '',isRequired: true, align: 'left', isSort: true },
    { id: "endDate", label: "End Date", minWidth: 120, type: 'date', sortDir: '',isRequired: true, align: 'left', isSort: true },
    { id: 'billRate', label: 'Bill Rate', minWidth: 80, type: 'textfield', sortDir: '', align: 'left', isSort: false},
    { id: 'billAllocation', label: 'Bill Allocation', minWidth: 100, min:0, max:100, isRequired: true, type: 'textfield', fieldType:'number', sortDir: '', align: 'left', isSort: false },
    { id: 'billStatus', label: 'Bill Status', minWidth: 80, type: 'select', sortDir: '', align: 'left', isSort: false },
    { id: 'costAllocation', label: 'Cost Allocation', minWidth: 100, type: 'textfield', sortDir: '', align: 'left', isSort: false },
    { id: 'actions', label: 'Actions', minWidth: 100, type: 'action', sortDir: '', align: 'left', isSort: false}
  ], 
  'Timesheet': [
    { id: "projectName", label: "Project Name", minWidth: 110, type: 'select', isRequired: true },
    { id: "task", label: "Task", minWidth: 100, maxWidth: 150, type: 'select', isRequired: true },
    { id: "notes", label: "Notes", minWidth: 100, maxWidth: 150, type: 'textfield', isRequired: false },
    { id: "totalHrs", label: "Total", minWidth: 60, type: 'empty' },
    { id: "status", label: "Status", minWidth: 60, type: 'empty' }
  ], 
  'MyTimeSheet': [
    { id: "projectName", label: "Project Name", minWidth: 110, type: 'select', isRequired: true },
    { id: "task", label: "Task", minWidth: 100,maxWidth: 150, type: 'select',isRequired: true },
    { id: "notes", label: "Notes", minWidth: 100,maxWidth: 150, type: 'textfield',isRequired: false },
    { id: "totalHrs", label: "Total", minWidth: 60, type: 'empty' },
    { id: "status", label: "Status", minWidth: 60, type: 'empty' },
  ],
  'Reportees': [
    { id: "projectName", label: "Project Name", minWidth: 110, type: 'select' },
    { id: "task", label: "Task", minWidth: 100, type: 'textfield' },
    { id: "viewDetails", label: "View Details", minWidth: 80, type: 'action' },
    { id: "totalHrs", label: "Total", minWidth: 60, type: 'empty' },
    { id: "status", label: "Status", minWidth: 60, type: 'empty' }
  ],
  'PendingApproval': [
    { id: "projectName", label: "Project Name", minWidth: 110, type: 'select' },
    { id: "task", label: "Task", minWidth: 100, type: 'textfield' },
    { id: "employeeName", label: "Employee Name", minWidth: 100, type: 'select' },
    { id: "totalHrs", label: "Total", minWidth: 60, type: 'empty' },
    { id: "status", label: "Status", minWidth: 60, type: 'empty' },
    { id: 'actions', label: 'Actions', minWidth: 100, type: 'action', align: 'left'}
  ],
  'Reporting': [
    { id: "employeeName", label: "Employee Name", minWidth: 120, type: 'select'},
    { id: "projectManagerName", label: "Manager Name", minWidth: 100, type: 'select'},
    { id: "projectName", label: "Project Name", minWidth: 110, type: 'select' },
    { id: "Period Week", label: "Period Week", minWidth: 110, type: 'select'},
    { id: "status", label: "Status", minWidth: 60, type: 'empty' },
  ]
};

export const getTypeofColumn = (col, moduleName) => {
  if (tableColumnsData[moduleName.replace(' ', '')] && tableColumnsData[moduleName.replace(' ', '')].length) {
    for (let column of tableColumnsData[moduleName.replace(' ', '')]) {
      if (column.id === col) {
        return column.type;
      }
    }
  }
};

export const getisRequiredofColumn = (col, moduleName) => {
  if (tableColumnsData[moduleName.replace(' ', '')] && tableColumnsData[moduleName.replace(' ', '')].length){
    for (let column of tableColumnsData[moduleName.replace(' ', '')]) {
      if (column.id === col) {
        return column.isRequired;
      }
    }
  }
}

export const getLabel = (col, moduleName) => {
  if (tableColumnsData[moduleName.replace(' ', '')] && tableColumnsData[moduleName.replace(' ', '')].length) {
    for (let column of tableColumnsData[moduleName.replace(' ', '')]) {
      if (column.id === col) {
        return column.label;
      }
    }
  }
  return '';
};

export const getMinWidth = (col, moduleName) => {
  if (tableColumnsData[moduleName.replace(' ', '')] && tableColumnsData[moduleName.replace(' ', '')].length) {
    for (let column of tableColumnsData[moduleName.replace(' ', '')]) {
      if (column.id === col) {
        return column.minWidth;
      }
    }
  }
};

export const fileHandler = (file, id, name, headingName) => {
  const accessToken = getLocalStorageItem(ACCESS_TOKEN);
  // const accessToken = cookies.get('userInformation');

  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    let URL = "";
    if (headingName === Modules.CLIENT_ADMIN)
      URL = `https://vtrack-dev-api.azurewebsites.net/Client/upload-msa?clientId=${id}&clientName=${name}`;
    else if (headingName === Modules.PROJECT_ADMIN)
      URL = `https://vtrack-dev-api.azurewebsites.net/ProjectAdmin/upload-sow?projectId=${id}&projectName=${name}`;
    axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  
};

export const convertDateToDDMYYYY = (data) => {
  if (!data) return ''; 
  let date = new Date(data.split("T")[0]);
  let MM = date.toLocaleString("default", {
    month: "long",
  });
  let YYYY = date.getFullYear();
  let DD = date.getDate();
  return DD + "-" + MM + "-" + YYYY
};

export const initialSort = {
  'Client Admin': 'clientName',
  'Project Admin': 'projectName',
  'Project Allocation': 'projectName',
  'Project Management': 'projectName',
};

export const getFullName = (firstName, lastName) => {
  let fullName = "";
  if (firstName) {
    fullName += firstName;
  }
  if (lastName) {
    fullName += " " + lastName
  }
  return fullName;
};

export const getApprovers = (renderValues, id) => {
  let approverList = '';
  for (let i = 0; i < renderValues.length; i++) {
    approverList += id === "approvers" ? renderValues[i].approverName : renderValues[i].employeeName;
    if (i !== renderValues.length - 1) {
      approverList += ', ';
    }
  }
  return approverList;
};

export const getApproversIds = (approvers) => {
  let approverIds = '';
  for (let i = 0; i < approvers.length; i++) {
    approverIds += approvers[i].approverId;
    if (i !== approvers.length - 1) {
      approverIds += ',';
    }
  }
  return approverIds;
};

export const getApproversWithIds = (approvers) => {
  return (<div>{approvers.map((approver)=>(<div>{`${approver.approverName} (${approver.approverEmail})`}</div>))}</div>);
};


export const getTotalHrs = (timesheetData) => {
  let totalHrs = 0;
  for (const data of timesheetData) {
    totalHrs += parseFloat(data.totalHrs);
  }
  let finalHours=(Math.round(totalHrs * 100) / 100).toFixed(2);
  if(finalHours.split('.')[1]==="00") finalHours=(Math.round(totalHrs * 100) / 100)
  return finalHours;
};

export const dateCalc = (newValue, col) => {
  let condition = col==="sowEndDate" || col==="msaEndDate" || col==="endDate" ? true : false;
  let value = newValue.toISOString();
  let date = new Date(value);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let time = condition ? "T23:59:59" : "T00:00:00";
  month = month<=9 ? '0'+month : month;
  day = day<=9 ? '0'+day : day;
  return year + '-' + month + '-' + day + time;
}