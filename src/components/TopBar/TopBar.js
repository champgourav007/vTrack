import React, { useEffect, useState } from "react";
import "./TopBar.css";
import props from "../../mock-data/TopBarMock";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions";
import { nonEmployeeIcon } from "../../common/icons";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useParams } from "react-router";
import { Tooltip } from "@mui/material";
import { useAzureADAuth } from "../../config/use-azure-ad";
export const TopBar = () => {
  const dispatch = useDispatch();
  const { logoutAzureAD } = useAzureADAuth();
  const { userData } = useSelector(({ USER }) => USER);
  const [personData, setPersonData] = useState(null);
  const [ activeUserRole, setActiveUserRole ] = useState('');

  const signOutHandler = () => {
    logoutAzureAD();
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const routeParams = useParams();

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
        {routeParams.moduleName ?
          <>
          <div className="logoText">
            <span className="textOne">{props.logoText[0]}</span>
            <span className="textTwo">{props.logoText.slice(1)}</span>
          </div>
          <div className="mainText">{props.mainText}</div>
          </> :
          <div className="dashboardPage-text">Dashboard</div>
        }
        </div>
        <div className="topbar-right">
          {personData  && 
          <div className="user-wrapper">
            <div>
              <img
                  alt=""
                  className="image"
                  src={personData.photo ? `data:image/jpeg;base64,${personData.photo}` : nonEmployeeIcon}
                />
            </div>
            <div className="userNameRoleWrapper">
              <div className="user-name">
                {personData.lastName}, {personData.firstName}
              </div>
              <div className="user-role">{activeUserRole ? activeUserRole : ''}</div>
            </div>
            {routeParams.moduleName ? "" : 
            <div style={{cursor:"pointer"}}>
                <Tooltip title="Logout">
              <LogoutRoundedIcon
                  className="logout-icon"
                  onClick={() => signOutHandler()}
                />
                </Tooltip>
                </div>}
          </div>
          }
        </div>
      </div>
    </>
  );
};
