import React from "react";
import Table from "./Table";
import "./DataTable.css";

export const DataTable = ({ headingName }) => {
  return (
    <>
      <div className="table-wrapper">
        <Table />
      </div>
    </>
  );
};
