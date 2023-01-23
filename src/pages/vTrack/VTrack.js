import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SelectedModule } from "../../components/SelectedModule/selected-module";
import Sidebar from "../../components/Sidebar/Sidebar";
import { ModuleList } from "../../mock-data/Sidebar";
import "./VTrack.css";
import Cookies from 'universal-cookie';

export const VTrack = () => {
  const [headingName, setHeadingName] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  useEffect(()=>{
    if(!cookies.get("userInformation")){
      navigate("/");
    }
  })

  const { userData } = useSelector(({ USER }) => USER);

  const changePage = (headingName) => {
    setHeadingName(headingName);
  };

  useEffect(()=>{
    if(userData){
      setHeadingName(ModuleList.find(e=>e.key===Object.keys(userData.data.tabs)[1]).name);
    }
  },[userData]);

  useEffect(() => {
    // let User = localStorage.getItem("userInformation");
    let User = cookies.get("userInformation");

    if (!User) navigate("/");
  }, []);

  return (
    <>
      <div className="mainDiv">
        <div className="sidebarContainer">
          <Sidebar changePage={changePage} />
        </div>
        <div className="rightContainer">
          <div className="selectedModule">
            <SelectedModule headingName={headingName} />
          </div>
        </div>
      </div>
    </>
  );
};
