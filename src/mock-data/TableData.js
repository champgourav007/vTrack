export const columns = [
  { id: "clientName", label: "Client Name", minWidth: 100 },
  { id: "location", label: "Client Location", minWidth: 80 },
  {
    id: "currency",
    label: "Currency",
    minWidth: 80,
  },
  {
    id: "msaStartDate",
    label: "MSA Start Date",
    minWidth: 100,
  },
  {
    id: "msaEndDate",
    label: "MSA End Date",
    minWidth: 110,
  },
  {
    id: "businessOwner",
    label: "Veersa Business Owner",
    minWidth: 100,
  },
  {
    id: "paymentTerms",
    label: "Payment Terms",
    minWidth: 80,
  },
  {
    id: "deliveryOfficer",
    label: "Veersa Delivery Officer",
    minWidth: 100,
  },
  {
    id: "msaDoc",
    label: "MSA Attachment",
    minWidth: 80,
  },
];

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

export const currencies = ["USD", "INR", "EU", "EUR"];

export const locations = ["US", "UK", "IN"];

export const businessOwners = ["Sudeb Mandal", "Rahul Gupta", "Vipul Taneja"];

export const paymentTerms = ["consectetur", "consectetur"];

export const deliveryOfficers = ["Rahul Gupta", "Vipul Taneja"];
