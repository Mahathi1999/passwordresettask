import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api_Caller from "../util.js/api_Caller";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email Address").required("required"),
  });
  const submitForm = async (values) => {
    if (!values.email) {
      return;
    }
    setLoader(true);
    const { email } = values;
    const type = "forgot-password";
    const body = { email };

    const { data, status } = await api_Caller(type, body);
    setLoader(false);
    if (status === 200) {
      //success
      toast.success(data.msg);
    } else {
      //failure
      toast.error(data.msg);
    }
  };

  return (
    <div className="container p-5">
      <h3 className="text-center mb-3">Type Your Email</h3>
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
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="form-text text-danger">
                      {formik.errors.email}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="d-flex justify-content-between mb-3">
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

export default Login;
