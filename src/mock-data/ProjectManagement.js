export const columns = [
  { id: "employeeID", label: "Employee ID", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 80 },
  {
    id: "offOn",
    label: "Off / On",
    minWidth: 80,
  },
  {
    id: "startDate",
    label: "Start Date",
    minWidth: 100,
  },
  {
    id: "endDate",
    label: "End Date",
    minWidth: 110,
  },
  {
    id: "billRate",
    label: "Bill Rate",
    minWidth: 100,
  },
  {
    id: "billStatus",
    label: "Bill Status",
    minWidth: 80,
  },
  {
    id: "billAllocation",
    label: "Bill Location",
    minWidth: 80,
  },
  {
    id: "costAllocation",
    label: "Cost Allocation",
    minWidth: 80,
  },
];
export const mappedProjectManagementData = [
  {
    clientId: 1,
    clientName: "Duly",
    projects: [
      {
        projectId: 1,
        projectName: "Collab"
      },
      {
        projectId: 2,
        projectName: "website"
      },
      {
        projectId: 3,
        projectName: "AI/ML"
      }
    ]
    
  },
  {
    clientId: 2,
    clientName: "kipu",
    projects: [
      {
        projectId: 0,
        projectName: "kipu ece"
      }
    ]
  }
]