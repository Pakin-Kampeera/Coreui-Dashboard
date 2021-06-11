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
import { useHistory } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState([]);

  const history = useHistory();

  const registerHandler = async (e) => {
    e.preventDefault();

    if (e.target[0].value === "") {
      setError("Username can not be empty");
      return;
    }

    if (e.target[1].value === "") {
      setError("Email can not be empty");
      return;
    }

    if (!e.target[1].value.includes("@")) {
      setError("Please include an '@' in the email address");
      return;
    }

    if (e.target[2].value === "") {
      setError("Password can not be empty");
      return;
    }

    if (e.target[3].value === "") {
      setError("Confirm password can not be empty");
      return;
    }

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setError("Password is not match");
    } else {
      try {
        const { data } = await axios.post(
          "api/auth/register",
          { username, email, password },
          config
        );
        console.log(data);
      } catch (error) {
        setError("Can not connect to database");
      }
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
                <CForm onSubmit={registerHandler} noValidate>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
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
                    Create Account
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

export default Register;
