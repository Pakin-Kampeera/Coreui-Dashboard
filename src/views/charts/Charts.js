import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CInputRadio,
  CLabel,
  CFormGroup,
} from "@coreui/react";
import { CChartBar, CChartPie } from "@coreui/react-chartjs";

import WordCloud from "../base/wordcloud/wordcloud";

const Charts = () => {
  useEffect(() => {});

  return (
    <CCardGroup columns className="cols-3">
      <CCard>
        <CCardHeader>Average Stress Overtime</CCardHeader>
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
              {
                label: "Can't tell",
                backgroundColor: "#F7A20F",
                data: [41, 31, 20, 16, 38, 15, 24, 35, 24, 14, 23, 35],
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

      <CCard>
        <CCardHeader>Words Cloud</CCardHeader>
        <div class="d-flex justify-content-center pt-2">
          <CFormGroup variant="custom-radio" inline>
            <CInputRadio
              custom
              id="inline-radio1"
              name="inline-radios"
              value="option1"
            />
            <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
              Show All
            </CLabel>
          </CFormGroup>
          <CFormGroup variant="custom-radio" inline>
            <CInputRadio
              custom
              id="inline-radio2"
              name="inline-radios"
              value="option2"
            />
            <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
              Stress
            </CLabel>
          </CFormGroup>
          <CFormGroup variant="custom-radio" inline>
            <CInputRadio
              custom
              id="inline-radio3"
              name="inline-radios"
              value="option3"
            />
            <CLabel variant="custom-checkbox" htmlFor="inline-radio3">
              Non-stress
            </CLabel>
          </CFormGroup>
          <CFormGroup variant="custom-radio" inline>
            <CInputRadio
              custom
              id="inline-radio4"
              name="inline-radios"
              value="option4"
            />
            <CLabel variant="custom-checkbox" htmlFor="inline-radio4">
              Can't tell
            </CLabel>
          </CFormGroup>
        </div>

        <CCardBody>
          <WordCloud />
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
};

export default Charts;
