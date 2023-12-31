import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vTrackIcon } from "../../common/icons";
import { collabtools, service, vTools } from "../../common/utils/dashboardData";
import Sidebar from "../../components/Sidebar/Sidebar";
import { TopBar } from "../../components/TopBar/TopBar";
import { VTrackURL } from "../../routes/routes";
import "./dashboard.css";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Cookies from 'universal-cookie';
import Loader from "../../components/Loaders/Loader";
import { useSelector } from "react-redux";
import { getLocalStorageItem } from "../../common/utils/local-storage";
import { ACCESS_TOKEN } from "../../common/constants/local-storage-keys";

const cookies = new Cookies();

export const Dashboard = () => {
  const [headingName, setHeadingName] = useState("Dashboard");
  const [hoveredItem, setHoveredItem] = useState("");
  const { vTrackLoader } = useSelector(({ APP_STATE }) => APP_STATE);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Veersa Portal";
  }, [])

  const changePage = (headingName) => {
    setHeadingName(headingName);
  };

  useEffect(()=>{
    if(!getLocalStorageItem(ACCESS_TOKEN)){
      navigate("/");
    }
  })

  const navigateHandler = () => {
    navigate(VTrackURL);
  };

  return (
    <>
    {vTrackLoader && <Loader />}
    <div className="mainDiv">
      {/* <div className="sidebarContainer">
        <Sidebar changePage={changePage} pageName="Dashboard" />
      </div> */}
      <div className="rightContainer dashboardRightContainer">
        <TopBar headingName="Veersa Applications" />
        <div className="vToolWrapper">
          <div className="wrapperHeading">
            <span style={{ color: "#1773BC" }}>v</span>
            <span style={{ color: "#6E6F74" }}>Tools</span>
          </div>
          <div className="allItemsWrapper">
            {vTools.map((item, index) => {
              return (
                <Grid>
                  <a className="removeUnderline" href={item.link}  target="_blank" rel="noreferrer">
                  <div className="individualItemWrapper" key={index}>
                    <div
                      onMouseOver={() => setHoveredItem(item.name)}
                      onMouseOut={() => setHoveredItem('')}
                      className="individualImgcontainer"
                      style={{
                        backgroundColor: hoveredItem === item.name ? "#1773BC" : "#fff",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        className="individualItemImg"
                        src={hoveredItem === item.name ? item.hoveredImg : item.image}
                        alt=""
                      />
                    </div>
                    <div className="individualItemText">
                      <span style={{ color: "#1773BC" }}>v</span>
                      <span style={{ color: "#6E6F74" }}>{item.name}</span>
                    </div>
                  </div>
                  </a>
                </Grid>
              );
            })}
          </div>
          <div className="wrapperHeading">
            <span className="headingText">Other Collaboration Tools</span>
          </div>
          <div className="allItemsWrapper">
            {collabtools.map((item, index) => {
              return (
                <a className="removeUnderline" href={item.link} target="_blank" rel="noreferrer">
                <div className="individualItemWrapper"  key={index}>
                    <div
                      onMouseOver={() => setHoveredItem(item.name)}
                      onMouseOut={() => setHoveredItem('')}
                      className="individualImgcontainer"
                      style={{
                        backgroundColor: hoveredItem === item.name ? "#1773BC" : "#fff",
                        borderRadius: "10px",
                      }}
                    >
                    <img
                      className="individualItemImg"
                      src={hoveredItem === item.name ? item.hoveredImg : item.image}
                      alt=""
                    />
                  </div>
                  <div className="individualItemText">
                    <span style={{ color: "#6E6F74" }}>{item.name}</span>
                  </div>
                </div>
                </a>
              );
            })}
          </div>
          <div className="wrapperHeading">
            <span className="headingText">Services</span>
          </div>
          <div className="allItemsWrapper">
            {service.map((item, index) => {
              return (
                <a className="removeUnderline" href={item.link} target="_blank" rel="noreferrer" >
                <div className="individualItemWrapper"  key={index}>
                    <div
                      onMouseOver={() => setHoveredItem(item.name)}
                      onMouseOut={() => setHoveredItem('')}
                      className="individualImgcontainer"
                      style={{
                        backgroundColor: hoveredItem === item.name ? "#1773BC" : "#fff",
                        borderRadius: "10px",
                      }}
                    >
                    <img
                      className="individualItemImg"
                      src={hoveredItem === item.name ? item.hoveredImg : item.image}
                      alt=""
                    />
                  </div>
                  <div className="individualItemText">
                    <span style={{ color: "#6E6F74" }}>{item.name}</span>
                  </div>
                </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};
