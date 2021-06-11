import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToaster,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "../../axios-data";
import { useHistory, useParams } from "react-router-dom";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState([]);

  const history = useHistory();
  const params = useParams();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }

    try {
      const { data } = await axios.put(
        `api/auth/resetPassword/${params.token}`,
        { password },
        config
      );
      console.log(data);
      history.replace("/login");
    } catch (error) {
      setError("Can not connect to database");
    }
  };

  const addToast = () => {
    setToasts([
      ...toasts,
      {
        position: "top-right",
        autohide: true && 3000,
        closeButton: true,
        fade: true,
      },
    ]);
  };

  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || [];
      toasters[toast.position].push(toast);
      return toasters;
    }, {});
  })();

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={resetPasswordHandler}>
                  <h1>Reset Password</h1>
                  <p className="text-muted">New password</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="New Password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CButton
                    color="success"
                    block
                    type="submit"
                    onClick={addToast}
                  >
                    Submit
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
            {Object.keys(toasters).map((toasterKey) => (
              <CToaster position={toasterKey} key={"toaster" + toasterKey}>
                {toasters[toasterKey].map((toast, key) => {
                  return (
                    <CToast
                      key={"toast" + key}
                      show={true}
                      autohide={toast.autohide}
                      fade={toast.fade}
                      color="danger"
                    >
                      <CToastBody>{error}</CToastBody>
                    </CToast>
                  );
                })}
              </CToaster>
            ))}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ForgotPassword;
