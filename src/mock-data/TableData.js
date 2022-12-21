export function createData(
  Id,
  ClientName,
  ClientLocation,
  Currency,
  MsaStartDate,
  MsaEndDate,
  VeersaBusinessOwner,
  PaymentTerms,
  VeersaDeliveryOfficer,
  MsaAttachment
) {
  return {
    Id,
    ClientName,
    ClientLocation,
    Currency,
    MsaStartDate,
    MsaEndDate,
    VeersaBusinessOwner,
    PaymentTerms,
    VeersaDeliveryOfficer,
    MsaAttachment,
  };
}

export const rows = [
  createData(
    "1",
    "Arvind",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "2",
    "John Watson",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "3",
    "John Watson",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "4",
    "John Watson",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "5",
    "John Watson",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "6",
    "John Watson",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "7",
    "John Watson",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "8",
    "John Watson",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "9",
    "John Watson",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "10",
    "John Watson",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "11",
    "Arvind",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "12",
    "Arvind",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "13",
    "Arvind",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
  createData(
    "14",
    "Arvind",
    "USA",
    "Dollars",
    "10-August-2022",
    "04-October-2022",
    "Sudeb Mandal",
    "15 Days",
    "Rahul Gupta",
    "Attachment"
  ),
];

export const dropDownMockData = {
  currency: ["USD", "INR", "EU", "EUR"],
  location: ["US", "UK", "IN"],
  businessOwner: ["Sudeb Mandal", "Rahul Gupta", "Vipul Taneja"],
  paymentTerms: ["consectetur", "consectetur"],
  deliveryOfficer: ["Rahul Gupta", "Vipul Taneja"],
  clientName: ['Duly', 'Pharma Code', 'Kipu'],
  projectManagerName: ['Amar', 'Sahil', 'Gaurav'], 
  employeeId: ['Arsalan', 'Arvind', 'Aditya'],
  projectName: ['duly', 'kipu']
};

export const initialData = {
  'Client Admin': {
    clientName: "",
    location: "",
    currency: "",
    msaStartDate: "",
    msaEndDate: "",
    businessOwner: "",
    paymentTerms: "",
    deliveryOfficer: "",
    msaDoc: "",
  },
  'Project Admin': {
    projectName: '',
    clientName: '',
    type: '',
    sowStartDate: '',
    sowEndDate: '',
    projectManagerName: ''
  },
  'Project Allocation': {
    employeeName: '',
    projectName: '',
    startDate: '',
    endDate: '',
    allocation: ''
  }
};
