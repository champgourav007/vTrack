export const UniqueIds = {
  ProjectAdmin: 'projectId',
  ClientAdmin: 'clientId',
  ProjectAllocation: 'projectAllocationId'
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
    { id: "employeeName", label: "Employee Name", minWidth: 100, type: 'select' },
    { id: "projectName", label: "Project Name", minWidth: 100, type: 'select' },
    { id: "projectManager", label: "Project Manager", minWidth: 80, type: 'select' },
    { id: "startDate", label: "Start Date", minWidth: 100, type: 'date' },
    { id: "endDate", label: "End Date", minWidth: 110, type: 'date' },
    { id: 'allocation', label: 'Allocation', minWidth: 100, type: 'textfield' }
  ], 
};

export const getTypeofColumn = (col, moduleName) => {
  for (let column of tableColumnsData[moduleName.replace(' ', '')]) {
    if (column.id === col) {
      return column.type;
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
