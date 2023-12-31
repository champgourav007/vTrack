import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getAllUserDetails,
  getNotifications,
  getSettingTableData,
  getUnregisteredUserDetails,
  getUserRoleData,
  saveUserRoleData,
  setVtrackLoader,
  syncAzureData,
} from "../../redux/actions";
import "./settings.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { SettingsTable } from "./settingsTable";
import { searchIcon } from "../../common/icons";
import { getFullName } from "../../common/utils/datatable";
import Loader from "../Loaders/Loader";
import { NotificationTable } from "../Notifications/notificationTable";
import moment from "moment";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function Settings({
  tabName
}) {
  const usersData = useSelector(({ MODULES }) => MODULES.settingTableData);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [userData, setUserData] = useState([]);
  const [syncedBy, setSyncedBy] = useState(null);
  const [syncedDate, setSyncedDate] = useState(null);
  const [rolesData, setRolesData] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();
  const { unRegisteredUserDetails } = useSelector(({ USER }) => USER);
  const { userRole } = useSelector(({ MODULES }) => MODULES);
  const {vTrackLoader} = useSelector(({APP_STATE}) => APP_STATE);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(value);
  };

  const getUsersNames = () => {
    let selectedNames = "";
    if (selectedUsers && selectedUsers.length) {
      for (let i = 0; i < selectedUsers.length; i++) {
        if (selectedUsers[i].lastName) {
          selectedNames += `${selectedUsers[i].firstName} ${selectedUsers[i].lastName}`;
        } else {
          selectedNames += selectedUsers[i].firstName;
        }
        if (i !== selectedUsers.length - 1) selectedNames += ", ";
      }
    }
    return selectedNames;
  };

  const convertIdToAzureId = (selUsers) => {
    let tempUsers = [];
    for (let user of selUsers) {
      tempUsers.push({
        ...user,
        azureId: user.id,
      });
    }
    return tempUsers;
  };
  const submitHandler = () => {
    dispatch(
      saveUserRoleData({
        roleID: selectedRole.roleID,
        data: convertIdToAzureId(selectedUsers),
      })
    );
    setSelectedRole("");
    setSelectedUsers([]);
  };

  const setSearchDataHelper = (e) => {
      setSearchData(e.target.value)
  };

  const getRoles = () => {
    if (selectedRole) return selectedRole.roleName;
    return selectedRole;
  }

  useEffect(() => {
    if(tabName === 'MANAGE USER ROLE'){
      dispatch(getAllUserDetails());
      dispatch(getUnregisteredUserDetails());
      dispatch(getUserRoleData());
      dispatch(getSettingTableData());
    } else if(tabName === 'MANAGE NOTIFICATIONS'){
      dispatch(getNotifications());
    }
  }, [tabName]);

  useEffect(() => {
    if (unRegisteredUserDetails) {
      setUserData(unRegisteredUserDetails);
    }
  }, [unRegisteredUserDetails]);

  useEffect(() => {
    if (userRole) {
      setRolesData(userRole);
    }
  }, [userRole]);

  useEffect(() => {
    if(usersData && usersData.length){
      setSyncedDate(usersData[0]["syncedDate"]);
      setSyncedBy(usersData[0]["syncedBy"]);
    }
  }, [usersData])

  const onClickSyncAzure = () =>{
    dispatch(syncAzureData());
  }

  if(tabName === 'MANAGE USER ROLE'){
    return (
      <>
        <div className="settingsWrapper">
        {/* <div className="topBar">
          <div className="selectUserWrapper">
            <div className="userText">Please Select the User</div>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel required id="demo-multiple-checkbox-label">User</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedUsers}
                  onChange={handleChange}
                  input={<OutlinedInput label="Select User" />}
                  renderValue={getUsersNames}
                  MenuProps={MenuProps}
                >
                  {userData.map((user) => (
                    <MenuItem key={user.id} value={user} className="no-left-margin">
                      <Checkbox checked={ selectedUsers.findIndex( (person) => person.id === user.id ) > -1 } />
                      <ListItemText primary={ getFullName(user.firstName, user.lastName) + " (" +user.email + ")" } />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="selectRolesWrapper">
            <div className="rolesText">Please Select the Role</div>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel required id="demo-multiple-checkbox-label">Role</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  input={<OutlinedInput label="Select Role" />}
                  renderValue={() => getRoles()}
                >
                  {rolesData.map((roles) => (
                    <MenuItem key={roles.roleID} value={roles}>
                      <ListItemText primary={roles.roleName} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="buttonClass">
            <Button variant="contained" disabled={!(selectedUsers && selectedUsers.length && selectedRole)} onClick={submitHandler} 
              className="addUserBtn">
              Add Role
            </Button>
          </div>
        </div> */}
       
        <div className="searchHeader">
          <div className="searchWrapper">
            <img src={searchIcon} className="searchIcon" alt="" />
            <input
              className="searchBox"
              type="search"
              placeholder="Search by Employee or Role"
              onChange={setSearchDataHelper}
            />
          </div>
          <div className="buttonClass">
            <div className="syncTextContainer">
              <div className="syncText">
                {syncedBy && <div>Last Synced By: {syncedBy}</div>}
              </div>
              <div className="syncText">
                {syncedDate && <div>Last Synced Date: {moment(syncedDate).format("DD-MM-yyyy LTS")}</div>}
              </div>
            </div>
            <Button 
              variant="contained" 
              onClick={onClickSyncAzure} 
              disabled = {vTrackLoader}
              className="addUserBtn">
                Sync Azure AD With vTrack
            </Button>
          </div>
        </div>
        <div className="bottomContainer">
          <SettingsTable rolesData={rolesData} searchData={searchData} /> 
        </div>
        </div>
      </> 
    )
  } else {
    return <NotificationTable />;
  }

}
