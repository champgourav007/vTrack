import React from "react";
import { useState } from "react";
import { DataTable } from "../../components/DataTable/DataTable";
import { SelectedModule } from "../../components/SelectedModule/selected-module";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./dashboard.css";

export const Dashboard = () => {
  const [headingName, setHeadingName] = useState("Client Admin");

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
          <SelectedModule headingName={headingName}/>
          {/* <DataTable headingName={headingName} /> */}
        </div>
      </div>
    </>
  );
};
