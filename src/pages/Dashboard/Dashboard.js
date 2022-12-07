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
<<<<<<< HEAD
        <div style={{ width: "76%" }}>
=======
        <div className="rightDiv">
>>>>>>> a9c9ea7dfcf48b9e312ac345a65958199616ed57
          <DataTable headingName={headingName} />
        </div>
      </div>
    </>
  );
};
