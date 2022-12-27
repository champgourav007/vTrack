import axios from "axios";
import { ACCESS_TOKEN } from "../constants/local-storage-keys";
import { Modules } from "../constants/sidebar";
import { getLocalStorageItem } from "./local-storage";

export const UniqueIds = {
  ProjectAdmin: 'projectId',
  ClientAdmin: 'clientId',
  ProjectAllocation: 'projectAllocationId',
  TimeSheet: 'fieldId',
  ProjectManagement: 'projectAllocationId'
};

export const tableColumnsData = {
  'ProjectAdmin': [
    { id: "projectName", label: "Project Name", minWidth: 100, type: 'textfield' },
    { id: "clientName", label: "Client Name", minWidth: 100, type: 'select' },
    { id: "type", label: "Type", minWidth: 80, type: 'select' },
    { id: "sowStartDate", label: "SOW Start Date", minWidth: 100, type: 'date' },
    { id: "sowEndDate", label: "SOW End Date", minWidth: 110, type: 'date' },
    { id: 'projectManagerName', label: 'Veersa Project Manager', minWidth: 100, type: 'select' }
  ],
  'ClientAdmin': [
    { id: "clientName", label: "Client Name", minWidth: 100, type: 'textfield' },
    { id: "location", label: "Client Location", minWidth: 80, type: 'select' },
    { id: "currency", label: "Currency", minWidth: 80, type: 'select' },
    { id: "msaStartDate", label: "MSA Start Date", minWidth: 100, type: 'date' },
    { id: "msaEndDate", label: "MSA End Date", minWidth: 110, type: 'date' },
    { id: "businessOwner", label: "Veersa Business Owner", minWidth: 100, type: 'select' },
    { id: "paymentTerms", label: "Payment Terms", minWidth: 80, type: 'select' },
    { id: "deliveryOfficer", label: "Veersa Delivery Officer", minWidth: 100, type: 'select' },
    { id: "msaDoc", label: "Actions", minWidth: 50, align: "left", type: 'none' },
  ],
  'ProjectAllocation': [
    { id: "employeeName", label: "Employee Name", minWidth: 120, type: 'select' },
    { id: "projectName", label: "Project Name", minWidth: 100, type: 'select' },
    { id: "projectManagerName", label: "Project Manager", minWidth: 80, type: 'select' },
    { id: "startDate", label: "Start Date", minWidth: 100, type: 'date' },
    { id: "endDate", label: "End Date", minWidth: 110, type: 'date' },
    { id: 'allocation', label: 'Allocation', minWidth: 100, type: 'textfield' },
    { id: 'status', label: 'Status', minWidth: 100, type: 'textfield' }
  ], 
  'ProjectManagement': [
    { id: "employeeName", label: "Employee Name", minWidth: 120, type: 'select' },
    { id: "endDate", label: "End Date", minWidth: 120, type: 'textfield' },
    { id: 'projectManagerName', label: 'Project Manager', minWidth: 100, type: 'textfield' },
    { id: 'projectName', label: 'Project Name', minWidth: 100, type: 'textfield' },
    { id: 'startDate', label: 'Start Date', minWidth: 110, type: 'textfield' },
    { id: 'status', label: 'Status', minWidth: 80, type: 'textfield' },
    { id: 'billRate', label: 'Bill Rate', minWidth: 80, type: 'textfield' },
    { id: 'billAllocation', label: 'Bill Allocation', minWidth: 100, type: 'textfield' },
    { id: 'billStatus', label: 'Bill Status', minWidth: 80, type: 'select' },
    { id: 'costAllocation', label: 'Cost Allocation', minWidth: 100, type: 'textfield' },
  ], 
  'TimeSheet': [
    { id: "projectName", label: "Project Name", minWidth: 110, type: 'select' },
    { id: "task", label: "Task", minWidth: 100, type: 'select' },
    { id: "totalHours", label: "Total", minWidth: 60, type: 'empty' },
  ], 
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

export const getLabel = (col, moduleName) => {
  for (let column of tableColumnsData[moduleName.replace(' ', '')]) {
    if (column.id === col) {
      return column.label;
    }
  }
  return '';
};

export const getMinWidth = (col, moduleName) => {
  for (let column of tableColumnsData[moduleName.replace(' ', '')]) {
    if (column.id === col) {
      return column.minWidth;
    }
  }
};

export const fileHandler = (file, id, name, headingName) => {
  const accessToken = getLocalStorageItem(ACCESS_TOKEN);
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    let URL = "";
    if (headingName === Modules.CLIENT_ADMIN)
      URL = `https://vtrack-api.azurewebsites.net/Client/upload-msa?clientId=${id}&clientName=${name}`;
    else if (headingName === Modules.PROJECT_ADMIN)
      URL = `https://vtrack-api.azurewebsites.net/ProjectAdmin/upload-sow?projectId=${id}&projectName=${name}`;
    axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
};

export const convertDateToDDMYYYY = (data) => {
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
}