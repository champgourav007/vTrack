import React, { useState } from "react";
import { filterIcon } from "../../common/icons";
import './selected-module.css';
import { DataTable } from './../DataTable/DataTable';
import TopBar from "../TopBar/TopBar"
import StickyHeadTable from "../DataTable/Table";


export const SelectedModule = ({headingName}) => {
  const [ isEdit, setIsEdit ] = useState(false);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);

  const addNewRow = (isTrue) => {
    setIsAddButtonClicked(isTrue)
  }

  return (
    <div className="mainContainer">
      <TopBar />
      <div className="heading">{headingName}</div>
      <div className="tableDiv">
        <div className="searchHeader">
          <input className="searchBox" type="search" placeholder="Search"/>
          <button className="filterBtn">
            <img className="filterIcon" src={filterIcon} alt=""/>
            <div className="disableBtnText">Filter</div>
          </button>
          <button disable={!isEdit} className={isEdit ? "editBtn" : "disableEditBtn"} onClick={() => { setIsEdit(!isEdit) }}>
            <div className={isEdit ? "btnText" : "disableBtnText" }>Edit Selected</div>
          </button>
          <button  disabled={isAddButtonClicked} className={isAddButtonClicked ? "disableAddButton" : "addBtn"} onClick={() => addNewRow(true)}>
          <div className={ isAddButtonClicked ? "disableAddButtonText" : "btnText"}>Add</div>
          </button>
        </div>
        <DataTable headingName={headingName} isAddButtonClicked={isAddButtonClicked}/>
      </div>
    </div>
  );
};
