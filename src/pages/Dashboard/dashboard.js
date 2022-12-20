import React, { useEffect } from "react";
import { dashboardData, headingMapping } from "../../mock-data/Dashboard";

export const Dashboard = () => {
  return (
    <div>
      {headingMapping.map((key) => {
        <div>{key}</div>;
      })}
    </div>
  );
}
