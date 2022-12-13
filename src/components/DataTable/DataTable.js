import React from "react";
import Table from "./Table";
import "./DataTable.css";

export const DataTable = ({ headingName, isAddButtonClicked, setIsAddButtonClicked }) => {
  return (
    <>
      <div className="table-wrapper">
        <Table isAddButtonClicked={isAddButtonClicked} setIsAddButtonClicked={setIsAddButtonClicked}/>
      </div>
    </>
  );
};
