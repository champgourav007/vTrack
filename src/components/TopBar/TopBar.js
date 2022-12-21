import React, { useEffect, useState } from "react";
import { bellIcon, message, dropDownArrow, UserTemp } from "../../common/icons";
import "./TopBar.css";
import props from "../../mock-data/TopBarMock";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions";
import Loader from "../Loader";
export const TopBar = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(({ USER }) => USER);
  const [personData, setPersonData] = useState({
    lastName: "Gupta",
    firstName: "Rahul",
    photo: UserTemp,
  });

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    if (userData) {
      setPersonData({
        lastName: userData.data.lastName,
        firstName: userData.data.firstName,
        photo: userData.data.photo === "" ? UserTemp : userData.data.photo,
      });
    }
    console.log(userData);
  }, [userData]);

  return (
    <>
      <div className="topbar-wrapper">
        <div className="topbar-left">
          <div className="logoText">
            <span className="textOne">{props.logoText[0]}</span>
            <span className="textTwo">{props.logoText.slice(1)}</span>
          </div>
          <div className="mainText">{props.mainText}</div>
        </div>
        <div className="topbar-right">
          <div className="user-wrapper">
            <div>
              {personData.photo === UserTemp ? (
                <img src={UserTemp} className="image" />
              ) : (
                <img
                  alt=""
                  className="image"
                  src={`data:image/jpeg;base64,${personData.photo}`}
                />
              )}
            </div>
            <div className="userNameRoleWrapper">
              <div className="user-name">
                {personData.lastName}, {personData.firstName}
              </div>
              <div className="user-role">{props.role}</div>
            </div>
            {/* <img className="dropDownArrow" src={dropDownArrow} alt="" /> */}
          </div>
        </div>
      </div>
    </>
  );
};
