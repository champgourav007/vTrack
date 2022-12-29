import {
  clientAdminImg,
  dashboardImg,
  projectAdminImg,
  projectAllocationImg,
  projectManagementImg,
  timesheetImg,
  vendorAdminImg,
  vendorSowAdminImg,
  clientAdminBlueIcon,
  projectAdminBlueIcon,
  projectAllocationBlueIcon,
  projectManagementBlueIcon,
  timeSheetBlueIcon,
  vendorAdminBlueIcon,
  vendorSowAdminBlueIcon,  
  dashboardBlueIcon
} from "../common/icons";

export const ModuleList = [
  { id: "1",key: 'dashboard', name: "Dashboard", img: dashboardImg, imgHover:dashboardBlueIcon },
  { id: "2",key:'projectAllocation', name: "Project Allocation", img: projectAllocationImg, imgHover:projectAllocationBlueIcon },
  { id: "3",key:'timeSheet', name: "TimeSheet", img: timesheetImg, imgHover:timeSheetBlueIcon },
  { id: "4",key:'projectManagement', name: "Project Management", img: projectManagementImg, imgHover:projectManagementBlueIcon },
  { id: "5",key:'clientAdmin' ,name: "Client Admin", img: clientAdminImg, imgHover:clientAdminBlueIcon },
  { id: "6",key:'projectAdmin' , name: "Project Admin", img: projectAdminImg, imgHover:projectAdminBlueIcon },
  { id: "7",key:'vendorAdmin' , name: "Vendor Admin", img: vendorAdminImg, imgHover:vendorAdminBlueIcon },
  { id: "8",key:'vendorSOWAdmin' , name: "Vendor SOW Admin", img: vendorSowAdminImg, imgHover:vendorSowAdminBlueIcon },
];
