import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { SelectedModule } from "../../components/SelectedModule/selected-module";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ModuleList } from "../../mock-data/Sidebar";
import "./VTrack.css";
import Cookies from 'universal-cookie';
import { getLocalStorageItem } from "../../common/utils/local-storage";
import { ACCESS_TOKEN } from "../../common/constants/local-storage-keys";
import { indexURL, VTrackURL } from "../../routes/routes";
import { Modules } from "../../common/constants/sidebar";
import moment from "moment";
import { DATE_TIME_FORMAT } from "../../common/constants/extra-constants";

export const VTrack = () => {
  const [headingName, setHeadingName] = useState("");
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const cookies = new Cookies();
  const [tabIndex, setTabIndex] = useState(0);
  const [periodWeek, setPeriodWeek] = useState(null);

  const { userData } = useSelector(({ USER }) => USER);
  const search = useLocation().search;

  useEffect(() => {
    const tabIndexQuery = new URLSearchParams(search).get('tabIndex');
    const periodWeekQuery = new URLSearchParams(search).get('periodWeek');
    if(tabIndexQuery !== null && periodWeekQuery !== null){
      setTabIndex(parseInt(tabIndexQuery));
      setPeriodWeek({
        startDate:  moment(moment(periodWeekQuery.split("-")[0]).format(DATE_TIME_FORMAT)).startOf('isoweek'),
        endDate: moment(moment(periodWeekQuery.split("-")[1]).format(DATE_TIME_FORMAT)).endOf('isoweek')
      });
    }
    else{
      setTabIndex(0);
      setPeriodWeek(null);
    }
  }, []);

  const changePage = (headingName) => {
    setHeadingName(headingName);
    if(headingName === Modules.PROJECT_ALLOCATION){
      setValue(1);
    }else{
      setValue(0);
    }
  };

  useEffect(()=>{
    
    let routeName = window.location.pathname.split("/").at(-1);
    if(userData){
      let head = null;
      Object.keys(userData.data.tabs).forEach((ele) => {
        if(ele.toLowerCase() === routeName.toLowerCase()){
          head = ele;
        }
      })
      if(head !== null){
        setHeadingName(ModuleList.find(e=>e.key===head).name);
      }else{
        setHeadingName(ModuleList.find(e=>e.key===Object.keys(userData.data.tabs)[1]).name);
      }
    }
  },[userData]);

  useEffect(() => {
    
    if(!getLocalStorageItem(ACCESS_TOKEN)){
      navigate(indexURL);
    }
  }, []);

  useEffect(() => {
    document.title = "vTrack";
  }, []);

  return (
    <>
      <div className="mainDiv">
        <div className="sidebarContainer">
          <Sidebar changePage={changePage} />
        </div>
        <div className="rightContainer">
          <div className="selectedModule">
            <SelectedModule headingName={headingName} value={value} setValue={setValue} tabIndex={tabIndex} periodWeek={periodWeek} setTabIndex={setTabIndex} setPeriodWeek={setPeriodWeek} />
          </div>
        </div>
      </div>
    </>
  );
};
