import React, { useState, useEffect } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "../../axios-data";
import { io } from "socket.io-client";

const WidgetsDropdown = () => {
  const [data, setData] = useState({
    users: "0",
    comments: "0",
    stress: "0",
    nonStress: "0",
  });
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
          data: { total },
        } = await axios.get("api/data/dashboard", config);
        setData({
          users: "" + total.users,
          comments: "" + total.comments,
          stress: "" + total.stress,
          nonStress: "" + total.nonStress,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

    const socket = io("http://localhost:2000");

    socket.open();

    socket.on("connect", () => console.log(`Widget socket ID is ${socket.id}`));

    socket.on("new-Data", (newData) => {
      setData((prevState) => {
        const users =
          newData.users === undefined ? prevState.users : "" + newData.users;
        const comments =
          newData.comments === undefined
            ? prevState.comments
            : "" + newData.comments;
        const stress =
          newData.stress === undefined ? prevState.stress : "" + newData.stress;
        const nonStress =
          newData.nonStress === undefined
            ? prevState.nonStress
            : "" + newData.nonStress;

        return {
          users: users,
          comments: comments,
          stress: stress,
          nonStress: nonStress,
        };
      });
    });

    return () => socket.close();
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <CRow>
          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-primary"
              header={data.users}
              text="Users"
              footerSlot={
                <div className={"text-center"} style={{ height: "70px" }}></div>
              }
            >
              <CDropdown>
                <CDropdownToggle color="transparent">
                  <CIcon name="cil-settings" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>

          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-info"
              header={data.comments}
              text="Messages"
              footerSlot={
                <div className={"text-center"} style={{ height: "70px" }}></div>
              }
            >
              <CDropdown>
                <CDropdownToggle caret={false} color="transparent">
                  <CIcon name="cil-location-pin" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>

          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-warning"
              header={data.stress}
              text="Stress Overview"
              footerSlot={
                <div className={"text-center"} style={{ height: "70px" }}></div>
              }
            >
              <CDropdown>
                <CDropdownToggle color="transparent">
                  <CIcon name="cil-settings" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>

          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-danger"
              header={data.nonStress}
              text="Non-stress Overview"
              footerSlot={
                <div className={"text-center"} style={{ height: "70px" }}></div>
              }
            >
              <CDropdown>
                <CDropdownToggle
                  caret
                  className="text-white"
                  color="transparent"
                >
                  <CIcon name="cil-settings" />
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-end">
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CWidgetDropdown>
          </CCol>
        </CRow>
      )}
    </>
  );
};

export default WidgetsDropdown;
