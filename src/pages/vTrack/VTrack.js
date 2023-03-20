import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SelectedModule } from "../../components/SelectedModule/selected-module";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ModuleList } from "../../mock-data/Sidebar";
import "./VTrack.css";
import Cookies from 'universal-cookie';
import { getLocalStorageItem } from "../../common/utils/local-storage";
import { ACCESS_TOKEN } from "../../common/constants/local-storage-keys";
import { indexURL } from "../../routes/routes";
import { Modules } from "../../common/constants/sidebar";

export const VTrack = () => {
  const [headingName, setHeadingName] = useState("");
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const cookies = new Cookies();
  useEffect(()=>{
    if(!getLocalStorageItem(ACCESS_TOKEN)){
      navigate(indexURL);
    }
  })

  const { userData } = useSelector(({ USER }) => USER);

  const changePage = (headingName) => {
    setHeadingName(headingName);
    if(headingName === Modules.PROJECT_ALLOCATION){
      setValue(1);
    }else{
      setValue(0);
    }
  };

  useEffect(()=>{
    if(userData){
      setHeadingName(ModuleList.find(e=>e.key===Object.keys(userData.data.tabs)[1]).name);
    }
  },[userData]);

  useEffect(() => {
    if(!getLocalStorageItem(ACCESS_TOKEN)){
      navigate("/");
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
            <SelectedModule headingName={headingName} value={value} setValue={setValue} />
          </div>
        </div>
      </div>
    </>
  );
};
