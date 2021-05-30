import React, { lazy, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const Chart = lazy(() => import("../charts/Charts"));
const Table = lazy(() => import("../base/tables/Tables"));

const Dashboard = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const socket = io("http://localhost:5000");
  socket.on("connect", () => {
    console.log(`Your socket ID is ${socket.id}`);
  });

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
        const { data } = await axios.get("/api/data", config);
        setData(data.data);
      } catch (error) {
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
