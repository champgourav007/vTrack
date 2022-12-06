import React from "react";
import { useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Dashboard() {
  const [headingName, setHeadingName] = useState("");
  const changePage = (headingName) => {
    setHeadingName(headingName);
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "16%" }}>
          <Sidebar changePage={changePage} />
        </div>
        <div style={{ width: "76%" }}>
          <DataTable headingName={headingName} />
        </div>
      </div>
    </>
  );
}
