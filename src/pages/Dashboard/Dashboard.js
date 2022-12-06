import React from "react";
import { useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./dashboard.css";

export const Dashboard = () => {
  const [headingName, setHeadingName] = useState("");

  const changePage = (headingName) => {
    setHeadingName(headingName);
  };

  return (
    <>
      <div className="mainDiv">
        <div className="sidebarContainer">
          <Sidebar changePage={changePage} />
        </div>
        <div className="rightDiv">
          <DataTable headingName={headingName} />
        </div>
      </div>
    </>
  );
};
