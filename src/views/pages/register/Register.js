import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CRow,
  CFormText,
  CFormGroup,
  CImg,
} from "@coreui/react";
import { withRouter, Link } from "react-router-dom";
import { httpCall, httpMethods } from "../../../httpServer";
import { apiUrls } from "../../../app.constanturls";

const createEmptyLogin = () => ({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const createErrors = () => ({
  username: false,
  email: false,
  password: false,
  confirmPassword: false,
});

const Register = (props) => {
  const [user, setUser] = React.useState(createEmptyLogin());

  const [errors, setErrors] = React.useState(createErrors());

  const [newtorkErrors, setapierrors] = React.useState([]);

  const [registered, setRegistered] = React.useState(true);

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

  const changeUserHandler = (target) => {
    let { name, value } = target;
    let usernew = { ...user };
    usernew[name] = value;
    setUser(usernew);
  };

  const submit = () => {
    console.log(user, errors);
    if (validateInput()) {
      httpCall(apiUrls.register, httpMethods.post, user)
        .then((result) => {
          if (result.success) {
            // props.history.push("/home");
            setRegistered(true);
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
    <div className="c-app c-default-layout flex-row align-items-center registerpage">
      <CContainer>
        {!registered ? (
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  {newtorkErrors.map((obj, key) => {
                    return (
                      <CFormText className="help-block dangeralert" key={key}>
                        {obj.text}
                      </CFormText>
                    );
                  })}
                  <CForm>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <CFormGroup>
                      <CInput
                        type="text"
                        placeholder="Username"
                        name="username"
                        autoComplete="username"
                        onChange={({ target }) => changeUserHandler(target)}
                      />
                      {errors.username && (
                        <CFormText className="help-block dangerRed">
                          Please enter the user name
                        </CFormText>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CInput
                        type="text"
                        placeholder="Email"
                        name="email"
                        autoComplete="email"
                        onChange={({ target }) => changeUserHandler(target)}
                      />
                      {errors.email && (
                        <CFormText className="help-block dangerRed">
                          Please enter the email
                        </CFormText>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="new-password"
                        onChange={({ target }) => changeUserHandler(target)}
                      />
                      {errors.password && (
                        <CFormText className="help-block dangerRed">
                          Please enter the password
                        </CFormText>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CInput
                        type="password"
                        placeholder="Repeat password"
                        name="confirmPassword"
                        autoComplete="new-password"
                        onChange={({ target }) => changeUserHandler(target)}
                      />
                      {errors.confirmPassword && (
                        <CFormText className="help-block dangerRed">
                          Please enter the confirm password
                        </CFormText>
                      )}
                    </CFormGroup>
                    <CButton color="success" block onClick={submit}>
                      Create Account
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        ) : (
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4 text-center">
                  <CImg
                    src={"avatars/check-mark.png"}
                    className="c-avatar-img"
                    alt="admin@bootstrapmaster.com"
                  />
                  <h4>Congratulations! You have successfully Registered.</h4>
                  <div className="text-right">
                    <Link to="/login">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Login Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        )}
      </CContainer>
    </div>
  );
};

export default withRouter(Register);
