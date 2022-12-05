import React from "react";
import "./Sidebar.css";
import DashboardImg from "../../static/svgs/Sidebar/Dashboard.svg";
import projectAllocationImg from "../../static/svgs/Sidebar/Project Allocation.svg";
import timeSheetImg from "../../static/svgs/Sidebar/TimeSheet.svg";
import projectManagementImg from "../../static/svgs/Sidebar/Project Management.svg";
import clientAdminImg from "../../static/svgs/Sidebar/Client Admin.svg";
import projectAdminImg from "../../static/svgs/Sidebar/Project Admin.svg";
import vendorAdminImg from "../../static/svgs/Sidebar/Vendor Admin.svg";
import vendorSOWAdminImg from "../../static/svgs/Sidebar/Vendor SOW Admin.svg";
import settingsImg from "../../static/svgs/Sidebar/Settings.svg";
import logoutImg from "../../static/svgs/Sidebar/Logout.svg";
import collapseImg from "../../static/svgs/Sidebar/Collapse Arrow.svg";
import VeersaImg from "../../static/svgs/Sidebar/VeersaLogo.svg";

export default function Sidebar() {
  return (
    <>
      <img src={VeersaImg} id="veersalogo" />
      <div
        className="sidebar_wrapper"
        style={{ paddingBottom: "26px", borderBottomStyle: "solid" }}
      >
        <div>
          <div className="sidebar_elements">
            <img src={DashboardImg} />
            Dashboard
          </div>
          <div className="sidebar_elements">
            <img src={projectAllocationImg} />
            Project Allocation
          </div>
          <div className="sidebar_elements">
            <img src={timeSheetImg} />
            TimeSheet
          </div>
          <div className="sidebar_elements">
            <img src={projectManagementImg} />
            Project Management
          </div>
          <div className="sidebar_elements">
            <img src={clientAdminImg} />
            Client Admin
          </div>
          <div className="sidebar_elements">
            <img src={projectAdminImg} />
            Project Admin
          </div>
          <div className="sidebar_elements">
            <img src={vendorAdminImg} />
            Vendor Admin
          </div>
          <div className="sidebar_elements">
            <img src={vendorSOWAdminImg} />
            Vendor SOW Admin
          </div>
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
            <img src={collapseImg} />
          </div>
        </div>
      </div>
    </>
  );
}
