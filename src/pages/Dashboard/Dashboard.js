import React, { useEffect } from "react";
import { useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [headingName, setHeadingName] = useState("");
  const navigate = useNavigate();

  const changePage = (headingName) => {
    setHeadingName(headingName);
  };

  useEffect(() => {
    let User = sessionStorage.getItem("userInformation");
    if (User==null) navigate("/");
  }, []);

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
