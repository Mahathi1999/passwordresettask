import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api_Caller from "../util.js/api_Caller";

const ResetPassword = () => {
  const { code } = useParams();
  const [state, setState] = useState({ token: "", resetCode: "" });

  useEffect(() => {
    const token = window.location.href.split("????")[1];
    const resetCode = code;
    setState({ resetCode, token });
  }, [code]);

  const [loader, setLoader] = useState(false);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("required")
      .min(8, "not less than 8 characters"),
    confirmPassword: Yup.string()
      .required("required")
      .min(8, "not less than 8 characters")
      .oneOf([Yup.ref("password")], "Passwords must be same"),
  });
  const submitForm = async (values) => {
    if (!values.confirmPassword || !values.password) {
      return;
    }

    setLoader(true);
    const { password } = values;
    const { token, resetCode } = state;
    const tokenPayload = token.split(".")[1];
    const { email, id } = JSON.parse(atob(tokenPayload));
    const type = "resetPassword";
    const body = { password, resetCode, email, id };
    const authorizationToken = token;
    console.log({ type, body, authorizationToken }, " api call");
    await api_Caller(type, body, authorizationToken);
    setLoader(false);
    toast.info("Very well, password changed");
  };

  return (
    <div className="container p-5">
      <h3 className="text-center mb-3">Reset Password</h3>
      <div className="m-auto col-sm-8 col-md-8  col-lg-6 card p-5 shadow ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {(formik) => {
            return (
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="form-text text-danger">
                      {formik.errors.password}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="form-text text-danger">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="d-flex justify-content-between ">
                  <button type="submit" className="btn btn-outline-primary ">
                    Submit
                  </button>
                  {loader && (
                    <div className="spinner-border text-info" role="status">
                      <span className="sr-only"></span>
                    </div>
                  )}
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
