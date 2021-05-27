import React, { lazy, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const Chart = lazy(() => import("../charts/Charts"));
const Table = lazy(() => import("../base/tables/Tables"));

const Dashboard = () => {
  const [privateData, setPrivateData] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.replace("/login");
    }
    const fetchPrivateData = async () => {
      const config = {
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorize please login");
      }
    };

    fetchPrivateData();
  }, []);

  return (
    <>
      <WidgetsDropdown />
      <Chart />
      <Table />
    </>
  );
};

export default Dashboard;
