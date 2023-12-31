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
import { useSelector } from "react-redux";

export default function Sidebar({ changePage, pageName }) {
  const { logoutAzureAD } = useAzureADAuth();
  const [collapse, setCollapse] = useState(false);
  const [mouseHover, setMouseHover] = useState("-1");
  const [selected, setSelected] = useState("");

  const { userData } = useSelector(({ USER }) => USER);

  const signOutHandler = () => {
    logoutAzureAD();
  };

  useEffect(()=>{
    let routeName = window.location.pathname.split("/").at(-1);
    if(userData){
      let head = null;
      Object.keys(userData.data.tabs).forEach((ele) => {
        if(ele.toLowerCase() === routeName.toLowerCase()){
          head = ele;
        }
      })
      if(head !== null){
        setSelected(ModuleList.find(e=>e.key===head).id);
      }else{
        setSelected(ModuleList.find(e=>e.key===Object.keys(userData.data.tabs)[1]).id);
      }
    }
  },[userData]);

  const getSidebarClass = (moduleId) => {
    let sidebarClass = "";
    if (moduleId === selected) sidebarClass = "sidebarItemsSelected";
    else sidebarClass = "sidebarItems";
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
          {userData && Object.keys(userData.data.tabs).map((moduleName, index) => {
            let module = ModuleList.find(e=>e.key === moduleName);
            if (module) {
            let sidebarClass = getSidebarClass(module.id);
            if(module.id !== "9") {
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
              )
            }}
          })}
        </div>
        <div className="bottomItems">
          <div className="divider" />
          <div
            className={
              selected === "9" ? 
              `sidebarItemsSelected ${userData?.data?.roleName === "Admin" ? "" : "displayNone"}` : 
              `sidebarItems ${userData?.data?.roleName === "Admin" ? "" : "displayNone"}`
              
            }
            onClick={() => {
              changePage("Settings");
              setSelected("9");
            }}
            onMouseOver={() => setMouseHover("9")}
            onMouseOut={() => setMouseHover("-1")}
          >
            <img
              className="itemImage"
              src={
                mouseHover === "9" || selected === "9"
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
          >
            <img
              className="arrowIcon"
              src={collapse === false ? collapseArrowImg : openArrowImg}
              alt=""
              onClick={() => {
                setCollapse(!collapse);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
