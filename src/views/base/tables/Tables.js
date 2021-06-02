import React from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";

// import usersData from "../../users/UsersData";

const getBadge = (status) => {
  switch (status) {
    case "non-stress":
      return "success";
    case "can't tell":
      return "warning";
    case "stress":
      return "danger";
  }
};
// const fields = ["name", "registered", "status"];
const fields = ["text", "labels", "confidence"];

const Tables = (props) => {
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Sentences</CCardHeader>
            <CCardBody>
              <CDataTable
                items={props.table}
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
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Tables;
