import React, { useEffect } from "react";
import "./selected-module.css";
import { TopBar } from "../TopBar/TopBar";
import TabsComponent from "../Tabs/tabs";
import { useNavigate } from "react-router-dom";
import { VTrackURL } from "../../routes/routes";
import { Settings } from "../Settings/settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SelectedModule = ({ headingName }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (headingName === "Dashboard") {
      navigate(VTrackURL);
    } else {
      let tempRouteName = headingName.replaceAll(' ','');
      navigate(`/vTrack/${tempRouteName}`);
    }
  }, [headingName]);

  return (
    <>
    <ToastContainer />  
    <div className="mainContainer">
      <TopBar headingName=""/>
      <div className="heading">{headingName}</div>
      {headingName === "Settings" ? <Settings/> : <TabsComponent headingName={headingName} />}
    </div>
    </>
  );
};
