import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Announcement from "../Announcement/announcement";
import Sidebar from "../Sidebar/Sidebar";
import { TopBar } from "../TopBar/TopBar";
import { getAllUserDetails } from "../../redux/actions";
import "./settings.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

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
  const [headingName, setHeadingName] = useState("Settings");
  const [rows, setRows] = useState([]);
  const [names, setNames] = useState([])
  const dispatch = useDispatch();
  const { allUserDetails } = useSelector(({ USER }) => USER);
  console.log(allUserDetails);

  useEffect(() => {
    dispatch(getAllUserDetails());
  }, []);

  useEffect(() => {
    if (allUserDetails) {
      setNames(allUserDetails.data);
      console.log(allUserDetails.data);
    }
  }, [allUserDetails]);
  const changePage = (headingName) => {
    setHeadingName(headingName);
  };
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value)
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // console.log(personName)
  };

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
                value={personName.firstName + personName.lastName}
                onChange={handleChange}
                input={<OutlinedInput label="Select User" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name.id} value={name}>
                    <Checkbox checked={personName.indexOf(name.id) > -1} />
                    <ListItemText primary={name.firstName + " " + name.lastName + " (" + name.email + ")"} />
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
