import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { TopBar } from "../../components/TopBar/TopBar";
import { getAllUserDetails } from "../../redux/actions";

export default function Settings() {
  const [headingName, setHeadingName] = useState("Settings");
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  // const { allUserDetails } = useSelector(({ USERS }) => USERS);

  useEffect(() => {
    dispatch(getAllUserDetails());
  }, []);

  // useEffect(() => {
  //   if(allUserDetails) {
  //     setRows(allUserDetails);
  //   }
  // }, [allUserDetails]);
  const changePage = (headingName) => {
    setHeadingName(headingName);
  };
  return (
    <div className="mainDiv">
      <div className="sidebarContainer">
        <Sidebar changePage={changePage} />
      </div>
      <div className="rightContainer">
        <TopBar />
        <select>
           <option value="none" selected disabled hidden>Select User</option>
          {rows &&
            rows.map((rowData, idx) => <option>{rowData.firstName}</option>)}
        </select>
      </div>
    </div>
  );
}
