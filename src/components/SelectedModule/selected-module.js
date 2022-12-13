import React from "react";
import './selected-module.css';
import { TopBar } from "../TopBar/TopBar"
import TabsComponent from "../Tabs/tabs";

export const SelectedModule = ({headingName}) => {
  return (
    <div className="mainContainer">
      <TopBar />
      <div className="heading">{headingName}</div>
      <TabsComponent headingName = {headingName}/>
    </div>
  );
};
