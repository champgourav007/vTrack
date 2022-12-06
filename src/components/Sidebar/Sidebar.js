import React from "react";
import "./Sidebar.css";
import {
  veersaLogo,
  clientAdminImg,
  collapseArrowImg,
  dashboardImg,
  logoutImg,
  projectAdminImg,
  projectAllocationImg,
  projectManagementImg,
  settingsImg,
  timesheetImg,
  vendorAdminImg,
  vendorSowAdminImg,
} from "../../common/icons";

export default function Sidebar(props) {
  const headingArr = [
    { name: "Dashboard", img: dashboardImg },
    { name: "Project Allocation", img: projectAllocationImg },
    { name: "TimeSheet", img: timesheetImg },
    { name: "Project Management", img: projectManagementImg },
    { name: "Client Admin", img: clientAdminImg },
    { name: "Project Admin", img: projectAdminImg },
    { name: "Vendor Admin", img: vendorAdminImg },
    { name: "Vendor SOW Admin", img: vendorSowAdminImg },
  ];
  return (
    <>
      <img src={veersaLogo} id="veersalogo" />
      <div
        className="sidebar_wrapper"
        style={{ paddingBottom: "26px", borderBottomStyle: "solid" }}
      >
        <div>
          {headingArr.map((heading, index) => {
            return (
              <div
                className="sidebar_elements"
                onClick={() => props.changePage(heading.name)}
                key={index}
              >
                <img src={heading.img} />
                {heading.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="sidebar_wrapper">
        <div>
          <div className="sidebar_elements">
            <img src={settingsImg} />
            Settings
          </div>
          <div className="sidebar_elements">
            <img src={logoutImg} />
            Logout
          </div>
          <div className="sidebar_elements" id="collapse_buttom">
            <img src={collapseArrowImg} />
          </div>
        </div>
      </div>
    </>
  );
}
