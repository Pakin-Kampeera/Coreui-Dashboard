import React, { lazy, useEffect } from "react";
import { useHistory } from "react-router-dom";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const Chart = lazy(() => import("../charts/Charts"));
const Table = lazy(() => import("../base/tables/Tables"));

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.replace("/login");
    }
  });

  return (
    <>
      <WidgetsDropdown />
      <Chart />
      <Table />
    </>
  );
};

export default Dashboard;
