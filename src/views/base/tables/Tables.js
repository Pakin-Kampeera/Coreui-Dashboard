import React, { useState, useEffect } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import { io } from "socket.io-client";
import axios from "../../../axios-data";

const getBadge = (status) => {
  switch (status) {
    case "non-stress":
      return "success";
    case "can't tell":
      return "warning";
    case "stress":
      return "danger";
    default:
      return "primary";
  }
};

const fields = ["text", "Date", "labels", "confidence"];

const Tables = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const {
          data: { history },
        } = await axios.get("api/data/dashboard", config);
        console.log(history);
        setData(history);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

    const socket = io("http://localhost:2000");

    socket.open();

    socket.on("connect", () => console.log(`Table socket ID is ${socket.id}`));

    socket.on("new-History", (newHistory) => {
      console.log(newHistory);
      setData((prevState) => [newHistory, ...prevState]);
    });

    return () => socket.close();
  }, []);

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Sentences</CCardHeader>
            {loading ? (
              <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <CCardBody>
                <CDataTable
                  items={data}
                  fields={fields}
                  hover
                  columnFilter
                  striped
                  bordered
                  sorter
                  size="lg"
                  itemsPerPage={20}
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
