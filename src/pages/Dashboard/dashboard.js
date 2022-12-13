import React, { useEffect } from "react";
import { useState } from "react";
import { SelectedModule } from "../../components/SelectedModule/selected-module";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { Announcement } from "../../components/Announcement/announcement";

export const Dashboard = () => {
  const [headingName, setHeadingName] = useState("Client Admin");
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
        <div className="rightContainer">
          <div className="announcementContainer">
            <Announcement />
          </div>
          <div className="selectedModule">
            <SelectedModule headingName={headingName}/>
          </div>
        </div>
      </div>
    </>
  );
};
