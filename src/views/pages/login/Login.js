import React from "react";
import { Link, withRouter } from "react-router-dom";
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
  CFormText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { httpCall, httpMethods } from "../../../httpServer";
import { apiUrls } from "../../../app.constanturls";

const createEmptyLogin = () => ({
  email: "",
  password: "",
});

const createErrors = () => ({
  email: false,
  password: false,
});

const Login = (props) => {
  const [user, setUser] = React.useState(createEmptyLogin());

  const [errors, setErrors] = React.useState(createErrors());

  const [newtorkErrors, setapierrors] = React.useState([]);

  const changeUserHandler = (target) => {
    let { name, value } = target;
    let usernew = { ...user };
    usernew[name] = value;
    setUser(usernew);
  };

  const validateInput = () => {
    let noerrors = true;
    let inputerrors = { ...errors };
    Object.keys(user).forEach((field) => {
      if (user[field] === "" || user[field] === undefined) {
        inputerrors[field] = true;
        noerrors = false;
      }
    });
    setErrors(inputerrors);
    return noerrors;
  };

  const submit = () => {
    if (validateInput()) {
      httpCall(apiUrls.login, httpMethods.post, user)
        .then((result) => {
          if (result.success) {
            localStorage.setItem("userdata", JSON.stringify(result.userdata));
            props.history.push("/dashboard");
          } else {
            setapierrors(result.errorMsg);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {newtorkErrors.map((obj, key) => {
                    return (
                      <CFormText className="help-block dangeralert" key={key}>
                        {obj.text}
                      </CFormText>
                    );
                  })}
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
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
                        name="email"
                        onChange={({ target }) => changeUserHandler(target)}
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
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        onChange={({ target }) => changeUserHandler(target)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={submit}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Do not have an account, please register by clicking the
                      Register Now.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default withRouter(Login);
