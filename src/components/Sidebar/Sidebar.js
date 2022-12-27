import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import {
  veersaLogo,
  collapseArrowImg,
  logoutImg,
  settingsImg,
  veersaLogoCollapse,
  openArrowImg,
  logoutBlueIcon,
  settingBlueIcon,
} from "../../common/icons";
import { useAzureADAuth } from "../../config/use-azure-ad";
import { ModuleList } from "../../mock-data/Sidebar";
import { useNavigate } from "react-router-dom";
import { VTrackURL } from "../../routes/routes";

export default function Sidebar({ changePage, pageName }) {
  const { logoutAzureAD } = useAzureADAuth();
  const [collapse, setCollapse] = useState(false);
  const [mouseHover, setMouseHover] = useState("-1");
  const [selected, setSelected] = useState("");
  const [displaystate, setDisplayState] = useState("");
  const navigate = useNavigate();

  const signOutHandler = () => {
    logoutAzureAD();
  };

  const getSidebarClass = (moduleId) => {
    let sidebarClass = "";
    if (moduleId === selected) sidebarClass = "sidebarItemsSelected";
    else if (selected === "" && moduleId == 5) {
      sidebarClass = "sidebarItemsSelected";
      setSelected("5");
    } else sidebarClass = "sidebarItems";
    return sidebarClass;
  };

  return (
    <div className={`sidebarOuterContainer ${collapse ? "" : "minWidthClass"}`}>
      <div
        className={
          collapse === false
            ? "veersaLogoContainer"
            : "veersaLogoContainer-collapse"
        }
      >
        <img
          className={collapse === false ? "veersaLogo" : "veersaLogo-collapse"}
          src={collapse === false ? veersaLogo : veersaLogoCollapse}
          id="veersalogo"
          alt=""
        />
      </div>
      {collapse === true ? <div className="divider" /> : ""}
      <div className="sidebarWrapper">
        <div className="topItems">
          {ModuleList.map((module, index) => {
            let sidebarClass = getSidebarClass(module.id);
            return (
              <div
                key={index}
                className={sidebarClass}
                onClick={() => {
                  changePage(module.name);
                  setSelected(module.id);
                }}
                onMouseOver={() => setMouseHover(module.id)}
                onMouseOut={() => setMouseHover(-1)}
                style={{
                  display:
                    pageName === "Dashboard" && module.id !== "1" ? "none" : "",
                }}
              >
                <img
                  className="itemImage"
                  src={
                    mouseHover === module.id || selected === module.id
                      ? module.imgHover
                      : module.img
                  }
                  alt=""
                />
                {collapse === false ? (
                  <div className="itemName">{module.name}</div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
        <div className="bottomItems">
          <div className="divider" />
          <div
            className={
              selected === "settings" ? "sidebarItemsSelected" : "sidebarItems"
            }
            onClick={() => {
              changePage("Settings");
              setSelected("Settings");
            }}
            onMouseOver={() => setMouseHover("settings")}
            onMouseOut={() => setMouseHover("-1")}
          >
            <img
              className="itemImage"
              src={
                mouseHover === "settings" || selected === "settings"
                  ? settingBlueIcon
                  : settingsImg
              }
              alt=""
            />
            {collapse === false ? <div className="itemName">Settings</div> : ""}
          </div>
          <div
            className="sidebarItems"
            onClick={() => signOutHandler()}
            onMouseOver={() => setMouseHover("logout")}
            onMouseOut={() => setMouseHover("-1")}
          >
            <img
              className="itemImage"
              src={mouseHover === "logout" ? logoutBlueIcon : logoutImg}
              alt=""
            />
            {collapse === false ? <div className="itemName">Logout</div> : ""}
          </div>
          <div
            id="collapse_buttom"
            onClick={() => {
              setCollapse(!collapse);
            }}
          >
            <img
              className="arrowIcon"
              src={collapse === false ? collapseArrowImg : openArrowImg}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
