import './tabsTable.css';
import { filterIcon } from "../../common/icons";
import { useState } from 'react';
import { DataTable } from '../DataTable/DataTable';

function TabsTable(props){
    const [ isEdit, setIsEdit ] = useState(false);
    return (
        <div className="tableDiv">
            <div className="searchHeader">
                <input className="searchBox" type="search" placeholder="Search" />
                <button className="filterBtn">
                    <img className="filterIcon" src={filterIcon} alt="" />
                    <div className="disableBtnText">Filter</div>
                </button>
                <button disable={!isEdit} className={isEdit ? "editBtn" : "disableEditBtn"} onClick={() => { setIsEdit(!isEdit) }}>
                    <div className={isEdit ? "btnText" : "disableBtnText"}>Edit Selected</div>
                </button>
                <button className="addBtn">
                    <div className="btnText">Add</div>
                </button>
            </div>
            <DataTable headingName={props.headingName} />
        </div>
    );
}

export default TabsTable;