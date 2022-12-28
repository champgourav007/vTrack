import React, { useEffect, useState } from "react";
import "./selected-module.css";
import { TopBar } from "../TopBar/TopBar";
import TabsComponent from "../Tabs/tabs";
import { Navigate, useNavigate, Redirect, useParams} from "react-router-dom";
import { dashboardURL } from "../../routes/routes";
import { Settings } from "../Settings/settings";
import SelectBar from "../SelectBar/selectBar";
import { useDispatch } from "react-redux";
import { getMappedProjectManagementData } from "../../redux/actions/project-management";

export const SelectedModule = ({ headingName }) => {
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedProjectName, setSelectedProjectName] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (headingName === "Dashboard") {
      navigate(dashboardURL);
    } else {
      let tempRouteName = headingName.replaceAll(' ','');
      navigate(`/vTrack/${tempRouteName}`);
    }
  }, [headingName]);

 useEffect(()=>{
  dispatch(getMappedProjectManagementData());
 },[]);

  return (
    <div className="mainContainer">
      <TopBar />
      {
        headingName === "Project Management" && <SelectBar setSelectedClient={setSelectedClient} selectedProjectName={selectedProjectName}/>
      }
      <div className="heading">{headingName}</div>
      {headingName === "settings" ? <Settings/> : <TabsComponent headingName={headingName} selectedClient = {selectedClient} setSelectedProjectName={setSelectedProjectName}/>}
    </div>
  );
};
