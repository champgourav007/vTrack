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
          <div className="wrapperHeading">
            <span style={{ color: '#1773BC' }}>v</span><span style={{ color: '#6E6F74'}}>Tools</span>
          </div>
          <div className="allItemsWrapper">
            <div className="individualItemWrapper">
              <img className="individualItemImg" src={vTrackIcon} alt="" onClick={navigateHandler}/>
              <div className="individualItemText">
                <span style={{ color: '#1773BC' }}>v</span><span style={{ color: '#6E6F74'}}>Track</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
