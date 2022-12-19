import React, { useEffect } from "react";
import { dashboardData, headingMapping } from "../../mock-data/Dashboard";

export default function Dashboard() {
  useEffect(() => {
    console.log(dashboardData);
  }, []);
  return (
    <div>
      {headingMapping.map((key) => {
        <div>{key}</div>;
      })}
    </div>
  );
}
