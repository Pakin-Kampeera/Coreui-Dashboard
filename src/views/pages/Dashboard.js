import React, { lazy, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../axios-data";
import { io } from "socket.io-client";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const Chart = lazy(() => import("../charts/Charts"));
const Table = lazy(() => import("../base/tables/Tables"));

const Dashboard = () => {
  const [table, setTable] = useState([]);
  const [error, setError] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.replace("/login");
    }

    const socket = io("http://localhost:2000");
    socket.on("connect", () => {
      console.log(`Your socket ID is ${socket.id}`);
    });

    socket.on("new-History", (newHistory) => {
      console.log(newHistory);
      setTable((prevState) => [newHistory, ...prevState]);
    });

    const fetchPrivateData = async () => {
      const config = {
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      // try {
      //   const { data } = await axios.get("/api/data", config);
      //   setData(data.data);
      // } catch (error) {
      //   setError("You are not authorize please login");
      // }
    };

    fetchPrivateData();
  }, []);

  return (
    <>
      <WidgetsDropdown />
      <Chart />
      <Table table={table}/>
    </>
  );
};

export default Dashboard;
