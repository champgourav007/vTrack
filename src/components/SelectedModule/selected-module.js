import React, { useEffect, useState } from "react";
import "./selected-module.css";
import { TopBar } from "../TopBar/TopBar";
import TabsComponent from "../Tabs/tabs";
import { useNavigate } from "react-router-dom";
import { dashboardURL } from "../../routes/routes";
import { Settings } from "../Settings/settings";
import SelectBar from "../SelectBar/selectBar";
import { useDispatch, useSelector } from "react-redux";
import { getMappedProjectManagementData, getProjectManagementData } from "../../redux/actions/project-management";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modules } from "../../common/constants/sidebar";

export const SelectedModule = ({ headingName }) => {
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedProjectName, setSelectedProjectName] = useState('')
  const { projectManagementData } = useSelector(({ MODULES }) => MODULES);
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
  if(headingName === Modules.PROJECT_MANAGEMENT) dispatch(getMappedProjectManagementData());
 }, [headingName]);

 useEffect(() => {
  if (selectedClient && selectedClient.projects && selectedClient.projects.length) {
    setSelectedProjectName(selectedClient.projects[0].projectName);
    if(headingName === Modules.PROJECT_MANAGEMENT)
    dispatch(
      getProjectManagementData({
        projectId: selectedClient.projects[0].projectId,
        pageNo: 1,
        pageSize: 10,
        sortBy: 'projectName',
        sortDir: "ASC",
        searchData: '',
      })
    );
  }
 }, [selectedClient]);

  return (
    <>
    <ToastContainer />  
    <div className="mainContainer">
      <TopBar />
      {
        headingName === "Project Management" && <SelectBar setSelectedClient={setSelectedClient} selectedProjectName={selectedProjectName}/>
      }
      <div className="heading">{headingName}</div>
      {headingName === "settings" ? <Settings/> : <TabsComponent headingName={headingName} selectedClient = {selectedClient} setSelectedProjectName={setSelectedProjectName}/>}
    </div>
    </>
  );
};
