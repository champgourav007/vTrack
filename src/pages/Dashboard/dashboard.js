import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vTrackIcon } from "../../common/icons";
import Sidebar from "../../components/Sidebar/Sidebar";
import { TopBar } from "../../components/TopBar/TopBar";
import { VTrackURL } from "../../routes/routes";
import "./dashboard.css";

export const Dashboard = () => {
  const [headingName, setHeadingName] = useState("Dashboard");
  const navigate = useNavigate();

  const changePage = (headingName) => {
    setHeadingName(headingName);
  };

  const navigateHandler = () => {
    navigate(VTrackURL);
  };
  useEffect(() => {
    let User = sessionStorage.getItem("userInformation");
    if (User == null) navigate("/");
  }, []);
  return (
    <div className="mainDiv">
      <div className="sidebarContainer">
        <Sidebar changePage={changePage} pageName="Dashboard" />
      </div>
      <div className="rightContainer dashboardRightContainer">
        <TopBar />
        <div className="vToolWrapper">
          <div className="wrapperHeading">vTools</div>
          <div className="allItemsWrapper">
            <div className="individualItemWrapper">
              <div className="individualItemImg" onClick={navigateHandler}>
                <img src={vTrackIcon} alt="" />
              </div>
              <div className="individualItemText">
                <span>vTrack</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
