import React, { useState, useEffect } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CSpinner,
} from "@coreui/react";
import { io } from "socket.io-client";
import axios from "../../../axios-data";

// import usersData from "../../users/UsersData";

const getBadge = (status) => {
  switch (status) {
    case "non-stress":
      return "success";
    case "can't tell":
      return "warning";
    case "stress":
      return "danger";
    default:
      return "";
  }
};
// const fields = ["name", "registered", "status"];
const fields = ["text", "labels", "confidence"];

const Tables = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (data.length === 0) {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };

        try {
          console.log("object");
          const { data } = await axios.get("api/data/dashboard", config);
          setData(data.history);
        } catch (error) {
          console.log(error);
        }
      } else {
        setLoading(false);
      }

      if (data.length !== 0) {
        return;
      }
    }

    fetchData();

    const socket = io("http://localhost:2000");

    socket.open();

    socket.on("connect", () => console.log(`Your socket ID is ${socket.id}`));

    socket.on("new-History", (newHistory) => {
      console.log(newHistory);
      setData((prevState) => [newHistory, ...prevState]);
    });

    return () => socket.close();
  }, [data]);

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Sentences</CCardHeader>
            {loading ? (
              <CSpinner />
            ) : (
              <CCardBody>
                <CDataTable
                  items={data}
                  fields={fields}
                  hover
                  striped
                  bordered
                  size="sm"
                  itemsPerPage={10}
                  pagination={{ align: "center" }}
                  scopedSlots={{
                    labels: (item) => (
                      <td>
                        <CBadge color={getBadge(item.labels)}>
                          {item.labels}
                        </CBadge>
                      </td>
                    ),
                  }}
                />
              </CCardBody>
            )}
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Tables;
