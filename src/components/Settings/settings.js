import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getAllUserDetails,
  getSettingTableData,
  getUserRoleData,
  saveUserRoleData,
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

export function Settings() {
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [userData, setUserData] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();
  const { allUserDetails } = useSelector(({ USER }) => USER);
  const { userRole } = useSelector(({ MODULES }) => MODULES);

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
    console.log(selectedRole);
    console.log(selectedUsers);
    dispatch(
      saveUserRoleData({
        roleID: selectedRole.roleID,
        data: convertIdToAzureId(selectedUsers),
      })
    );
  };

  const setSearchDataHelper = (e) => {
    if(e.target.value.length > 2 || e.target.value.length === 0) {
      setSearchData(e.target.value)
    }
  }

  useEffect(() => {
    dispatch(getAllUserDetails());
    dispatch(getUserRoleData());
    dispatch(getSettingTableData());
  }, []);

  useEffect(() => {
    if (allUserDetails) {
      setUserData(allUserDetails.data);
    }
  }, [allUserDetails]);

  useEffect(() => {
    if (userRole) {
      setRolesData(userRole);
    }
  }, [userRole]);

  return (
    <>
      <div className="settingsWrapper">
      <div className="topBar">
        <div className="selectUserWrapper">
          <div className="userText">Please Select the User</div>
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">User</InputLabel>
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
                    <Checkbox
                      checked={
                        selectedUsers.findIndex(
                          (person) => person.id === user.id
                        ) > -1
                      }
                    />
                    <ListItemText
                      primary={
                        user.firstName +
                        " " +
                        user.lastName +
                        " (" +
                        user.email +
                        ")"
                      }
                    />
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
              <InputLabel id="demo-multiple-checkbox-label">Role</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                onChange={(e) => setSelectedRole(e.target.value)}
                input={<OutlinedInput label="Select Role" />}
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
          <Button variant="contained" onClick={submitHandler} className="addBtn">
            Add Role
          </Button>
        </div>
      </div>
      <div className="searchHeader">
        <div className="searchWrapper">
          <img src={searchIcon} className="searchIcon" alt="" />
          <input
            className="searchBox"
            type="search"
            placeholder="Search"
            onChange={setSearchDataHelper}
          />
        </div>
      </div>
      <div className="bottomContainer">
        <SettingsTable rolesData={rolesData} /> 
      </div>
      </div>
    </> 
  );
}
