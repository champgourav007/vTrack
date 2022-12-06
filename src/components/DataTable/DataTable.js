import React from "react";
import { useEffect } from "react";
import Table from "./Table";
import "./DataTable.css";

export default function DataTable({ headingName }) {
  return (
    <>
      <div>{headingName}</div>
      <div className="table-wrapper">
        <Table />
      </div>
    </>
  );
}
