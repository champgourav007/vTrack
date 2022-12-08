import React, { useState } from "react";
import "./Sidebar.css";
import {
  veersaLogo,
  collapseArrowImg,
  logoutImg,
  settingsImg,
  veersaLogoCollapse
} from "../../common/icons";
import { useAzureADAuth } from "../../config/use-azure-ad";
import { ModuleList } from "../../mock-data/Sidebar";

export default function Sidebar(props) {
  const { logoutAzureAD } = useAzureADAuth();

  const signOutHandler = () => {
    logoutAzureAD();
  };

  const [collapse, setCollapse] = useState(false)
  const [mouseHover, setMouseHover] = useState(-1)
  const [selected, setSelected] = useState("")
  const [bottomSelect, setBottomSelect] = useState("")
  console.log(collapse);
  return (
    <div className="sidebarOuterContainer">
      <div className={(collapse === false) ? "veersaLogoContainer":"veersaLogoContainer-collapse"}>
        <img className={(collapse === false)?"veersaLogo":""} src={(collapse === false)?veersaLogo:veersaLogoCollapse} id="veersalogo" alt="" />
      </div>
      <div className="sidebarWrapper">
        <div className="topItems">
        { ModuleList.map((module, index) => {
          return (
            <div 
              key={index}
              className={(module.id === selected)?"sidebarItemsSelected":"sidebarItems"}
              onClick={() => {
                            props.changePage(module.name)
                            setSelected(module.id)
              }}
              onMouseOver={() => setMouseHover(module.id)}
              onMouseOut={() => setMouseHover(-1)}
            >
              <img className="itemImage" src={(mouseHover === module.id || selected === module.id)?module.imgHover:module.img}  alt=""/>
              {(collapse === false)
                ?<div className="itemName">{module.name}</div>:""}
            </div>
          )
        })}
        </div>
        <div className="bottomItems">
          <div className="divider" />
          <div className="sidebarItems" onClick={()=>{
                                                setSelected(-1) 
                                                setBottomSelect("settings")
                                          }}>
            <img className="itemImage" src={settingsImg} alt=""/>
            {(collapse === false) ?
            <div className="itemName">Settings</div> : ""}
          </div>
          <div className="sidebarItems" onClick={() => signOutHandler()}>
            <img className="itemImage" src={logoutImg} alt=""/>
            {(collapse === false) ?
            <div className="itemName">Logout</div>:""}
          </div>
          <div className="arrowIcon" id="collapse_buttom">
            <img src={collapseArrowImg} onClick={()=>{setCollapse(!collapse)}} alt=""/>
          </div>
        </div>
      </div>
    </div>
  );
};
