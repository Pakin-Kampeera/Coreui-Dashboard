import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("Please provide email and password");
  const [toasts, setToasts] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.replace("/dashboard");
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "api/auth/login",
        { email, password },
        config
      );
      console.log(data);
      localStorage.setItem("authToken", data.token);
      history.replace("/dashboard");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const addToast = () => {
    setToasts([
      ...toasts,
      {
        position: "top-right",
        autohide: true && 2000,
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
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={loginHandler}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        required
                        type="email"
                        placeholder="Email"
                        autoComplete="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        required
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CButton
                      color="primary"
                      block
                      type="submit"
                      onClick={addToast}
                    >
                      Login
                    </CButton>
                    <CRow>
                      <CCol>
                        <Link to="/forgotPassword">
                          <CButton color="link" className="pt-4 pl-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                    <span className="text-muted">Don't have account? </span>
                    <Link to="/register">
                      <CButton color="link" className="pt-1 pl-0">
                        Register Now
                      </CButton>
                    </Link>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>

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
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
