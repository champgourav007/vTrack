import React, { useEffect, useState } from "react";
import "./TopBar.css";
import props from "../../mock-data/TopBarMock";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions";
export const TopBar = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(({ USER }) => USER);
  const [personData, setPersonData] = useState(null);
  const [ activeUserRole, setActiveUserRole ] = useState('');

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    if (userData && userData.data) {
      setPersonData({
        lastName: userData.data.activeUsers.lastName,
        firstName: userData.data.activeUsers.firstName,
        photo: userData.data.activeUsers.photo === "" ? "" : userData.data.activeUsers.photo,
      });
      setActiveUserRole(userData.data.roleName);
    }
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
          {personData  && 
          <div className="user-wrapper">
            <div>
              <img
                  alt=""
                  className="image"
                  src={`data:image/jpeg;base64,${personData.photo}`}
                />
            </div>
            <div className="userNameRoleWrapper">
              <div className="user-name">
                {personData.lastName}, {personData.firstName}
              </div>
              <div className="user-role">{activeUserRole ? activeUserRole : ''}</div>
            </div>
          </div>
          }
        </div>
      </div>
    </>
  );
};
