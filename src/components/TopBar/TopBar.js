import React from "react";
import { bellIcon, message, UserTemp, dropDownArrow } from "../../common/icons";
import "./TopBar.css";
import props from "../../mock-data/TopBarMock";
function TopBar() {
  return (
    <div className="topbar-wrapper">
      <div className="topbar-left">
        <div className="logoText">
          <span className="textOne">{props.logoText[0]}</span>
          <span className="textTwo">{props.logoText.slice(1)}</span>
        </div>
        <div className="mainText">{props.mainText}</div>
      </div>
      <div className="topbar-right">
        <div className="rectangle-wrapper">
          <div className="rectangle">
            <img src={bellIcon} alt="" />
          </div>
          <div className="rectangle">
            <img src={message} alt="" />
          </div>
        </div>
        <div className="user-wrapper">
          <div>
            <img alt="" className="image" src={UserTemp} />
          </div>
          <div>
            <div className="user-name">
              {props.lastName}, {props.firstName}
            </div>
            <div className="user-role">{props.role}</div>
          </div>
          <img className="dropDownArrow" src={dropDownArrow} alt="" />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
