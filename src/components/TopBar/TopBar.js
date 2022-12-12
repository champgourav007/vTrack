import React, { useEffect } from "react";
import { bellIcon, message, dropDownArrow, UserTemp } from "../../common/icons";
import "./TopBar.css";
import props from "../../mock-data/TopBarMock";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../../redux/actions";
export const TopBar = () => {
  const dispatch = useDispatch();
  // const { userData } = useSelector(({ USER }) =>
  //   USER);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);


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
          <img alt="" className="image" src={`data:image/jpeg;base64,${UserTemp}`} />
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
