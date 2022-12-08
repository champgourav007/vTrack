import React from "react";
import "./Sidebar.css";
import {
  veersaLogo,
  collapseArrowImg,
  logoutImg,
  settingsImg,
} from "../../common/icons";
import { useAzureADAuth } from "../../config/use-azure-ad";
import { ModuleList } from "../../mock-data/Sidebar";

export default function Sidebar(props) {
  const { logoutAzureAD } = useAzureADAuth();

  const signOutHandler = () => {
    logoutAzureAD();
  };

  return (
    <div className="sidebarOuterContainer">
      <div className="veersaLogoContainer">
        <img className="veersaLogo" src={veersaLogo} id="veersalogo" alt="" />
      </div>
      <div className="sidebarWrapper">
        <div className="topItems">
        { ModuleList.map((module, index) => {
          return (
            <div 
              key={index}
              className="sidebarItems"
              onClick={() => props.changePage(module.name)}
            >
              <img className="itemImage" src={module.img} alt=""/>
              <div className="itemName">{module.name}</div>
            </div>
          )
        })}
        </div>
        <div className="bottomItems">
          <div className="divider" />
          <div className="sidebarItems">
            <img className="itemImage" src={settingsImg} alt=""/>
            <div className="itemName">Settings</div>
          </div>
          <div className="sidebarItems" onClick={() => signOutHandler()}>
            <img className="itemImage" src={logoutImg} alt=""/>
            <div className="itemName">Logout</div>
          </div>
          <div className="arrowIcon" id="collapse_buttom">
            <img src={collapseArrowImg} alt=""/>
          </div>
        </div>
      </div>
    </div>
  );
};
