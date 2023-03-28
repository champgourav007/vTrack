import React, { useEffect } from "react";
import "./selected-module.css";
import { TopBar } from "../TopBar/TopBar";
import TabsComponent from "../Tabs/tabs";
import { useNavigate } from "react-router-dom";
import { VTrackURL } from "../../routes/routes";
import { Settings } from "../Settings/settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modules } from "../../common/constants/sidebar";
import { pdfIcon } from "../../common/icons";
import { Tooltip } from "@mui/material";
import { PROJECT_MANAGER_USER_MANUAL_LINK } from "../../common/constants/extra-constants";

export const SelectedModule = ({ headingName, value, setValue, tabIndex, periodWeek, setTabIndex, setPeriodWeek }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (headingName === "Dashboard") {
      navigate(VTrackURL);
    } else if(headingName.length !== 0) {
      let tempRouteName = headingName.replaceAll(' ','');
      navigate(`/vTrack/${tempRouteName}`);
    }
  }, [headingName]);

  return (
    <>
    <ToastContainer />  
    <div className="mainContainer">
      <TopBar headingName=""/>
      <div className="heading">
        {headingName}
        {headingName === Modules.PROJECT_MANAGEMENT &&
          <Tooltip title={<h2>Project Manager Guide for vTrack</h2>}>
              <a href={PROJECT_MANAGER_USER_MANUAL_LINK} style={{textDecoration: 'None'}} target="_blank">
                <button style={{maxHeight: '3rem', minHeight: '0'}} className="MuiTab-textColorPrimary tabs-table css-1h9z7r5-MuiButtonBase-root-MuiTab-root">
                  <div style={{display: 'flex',alignItems: 'center', gap: '0.5rem'}}>
                    <p>Project Manager Guide</p>
                    <img src={pdfIcon} />
                  </div>
                </button>
              </a>
          </Tooltip>
        }
      </div> 
      {/* {headingName === "Settings" ? <Settings/> : <TabsComponent headingName={headingName} />} */}
      {<TabsComponent headingName={headingName} value={value} setValue={setValue} tabIndex={tabIndex} periodWeek={periodWeek} setTabIndex={setTabIndex} setPeriodWeek={setPeriodWeek} />}
    </div>
    </>
  );
};
