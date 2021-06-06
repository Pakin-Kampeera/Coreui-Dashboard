import React, { useState, useEffect } from "react";
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
import axios from "../../axios-data";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      // props.history.push("/");
    }
  }, []);

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "api/auth/forgotPassword",
        { email },
        config
      );
      console.log(data);
      history.replace("/login");
    } catch (error) {
      setError(error.response.data.error);
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
                <CForm onSubmit={forgotPasswordHandler}>
                  <h1>Forgot Password</h1>
                  <p className="text-muted">
                    Please enter the email address you register the account
                    with. We will send a reset password confirmation to this
                    email.
                  </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
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
