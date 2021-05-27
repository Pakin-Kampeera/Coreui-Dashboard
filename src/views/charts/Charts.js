import React from "react";
import { CCard, CCardBody, CCardGroup, CCardHeader } from "@coreui/react";
import {
  CChartBar,
  CChartPie,
} from "@coreui/react-chartjs";

const Charts = () => {
  return (
    <CCardGroup columns className="cols-2">
      <CCard>
        <CCardHeader>
          Average Stress Overtime
        </CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: "Stress",
                backgroundColor: "#f87979",
                data: [40, 40, 54, 39, 40, 40, 39, 80, 40, 70, 53, 31],
              },
              {
                label: "Non-stress",
                backgroundColor: "#03D9FF",
                data: [29, 43, 80, 86, 48, 45, 34, 75, 64, 74, 53, 75],
              },
            ]}
            labels="months"
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Overall Stress</CCardHeader>
        <CCardBody>
          <CChartPie
            datasets={[
              {
                backgroundColor: ["#F7A110", "#00D8FF", "#2DB85C"],
                data: [40, 30, 80],
              },
            ]}
            labels={["Stress", "Non-stress", "Can't tell"]}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
};

export default Charts;
