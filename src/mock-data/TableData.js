import moment from "moment";

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
  projectName: ['duly', 'kipu'],
  status: ['billable', 'non-billable']
};

export const initialData = (headingName ,selectedPeriodWeek) => {
  switch(headingName) {
    case 'Client Admin':
      return {
        clientName: "",
        location: "",
        currency: "",
        msaStartDate: "",
        msaEndDate: "",
        businessOwner: "",
        paymentTerms: "",
        deliveryOfficer: "",
        msaDoc: "",
      };
    case 'Project Admin':
      return {
        projectName: '',
        clientName: '',
        type: '',
        sowStartDate: '',
        sowEndDate: '',
        projectManagerName: ''
      };
    case 'Project Allocation':
      return {
        employeeName: '',
        projectName: '',
        startDate: '',
        endDate: '',
        allocation: ''
      };
    case 'TimeSheet':
      let dates = {};
      let date = moment(selectedPeriodWeek.startDate);
      for (let i=0;i<7;i++){
        dates[date.format('')] = "";
        date.add(1,'days');
      }
      return {
        projectName:'',
        task:'',
        totalHrs:'',
        ...dates
      };
    case 'Project Management':
      return {
        employeeName: '',
        endDate: '',
        projectManagerName: '',
        projectName: '',
        startDate: '',
        status: ''
      };
    default:
      return {};
  }
};

export const timeSheetData = {
  data: [
    {
      "fieldId": 1,
      "projectName": "Duly",
      "task": "Development",
      "dateHours": [
        {
          "date": moment('20221114'),
          "hours": 2,
        },
        {
          "date": moment('20221114').add(1,'days'),
          "hours": 4,
        },
        {
          "date": moment('20221114').add(2,'days'),
          "hours": 1.2,
        },
        {
          "date": moment('20221114').add(3,'days'),
          "hours": 0,
        },
        {
          "date": moment('20221114').add(4,'days'),
          "hours": 2,
        },
        {
          "date": moment('20221114').add(5,'days'),
          "hours": 0,
        },
        {
          "date": moment('20221114').add(6,'days'),
          "hours": 1,
        }
      ],
      "totalHrs": 5
    },
    {
      "fieldId": 2,
      "projectName": "Duly",
      "task": "Development",
      "dateHours": [
        {
          "date": moment('20221114'),
          "hours": 2.1,
        },
        {
          "date": moment('20221114').add(1,'days'),
          "hours": 0,
        },
        {
          "date": moment('20221114').add(2,'days'),
          "hours": 3.2,
        },
        {
          "date": moment('20221114').add(3,'days'),
          "hours": 0.5,
        },
        {
          "date": moment('20221114').add(4,'days'),
          "hours": 1,
        },
        {
          "date": moment('20221114').add(5,'days'),
          "hours": 4,
        },
        {
          "date": moment('20221114').add(6,'days'),
          "hours": 0,
        }
      ],
      "totalHrs": 5
    }
  ],
  totalCount: 2
}

export const allTasks = [
  {
    taskName: "Define & Hypothesis",
    taskId:1,
  },
  {
    taskName:"Development",
    taskId:2,
  },
  {
    taskName:"Prototyping & Testing",
    taskId:3,
  },
  {
    taskName:"Design Review",
    taskId:4,
  },
  {
    taskName:"Visual Design",
    taskId:5,
  }
]