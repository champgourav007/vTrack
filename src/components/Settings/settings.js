import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllUserDetails } from "../../redux/actions";
import "./settings.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

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
  const [userData, setUserData] = useState([])
  const dispatch = useDispatch();
  const { allUserDetails } = useSelector(({ USER }) => USER);
  console.log(allUserDetails);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedUsers(value);
  };

  const getUsersNames = () => {
    let selectedNames = '';
    if (selectedUsers && selectedUsers.length) {
      for (let i=0;i<selectedUsers.length;i++) {
        if (selectedUsers[i].lastName) {
          selectedNames += `${selectedUsers[i].firstName} ${selectedUsers[i].lastName}`;
        }
        else {
          selectedNames += selectedUsers[i].firstName;
        }
        if (i !== selectedUsers.length - 1)
          selectedNames += ', ';
      }
    }
    return selectedNames;
  };

  useEffect(() => {
    dispatch(getAllUserDetails());
  }, []);

  useEffect(() => {
    if (allUserDetails) {
      setUserData(allUserDetails.data);
    }
  }, [allUserDetails]);

  return (
    <>
      <div className="settingsWrapper">
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
                  <MenuItem key={user.id} value={user}>
                    <Checkbox checked={selectedUsers.findIndex(person => person.id === user.id) > -1} />
                    <ListItemText primary={user.firstName + " " + user.lastName + " (" + user.email + ")"} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
}
