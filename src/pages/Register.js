import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api_Caller from "../util.js/api_Caller";

const Register = () => {
  const [loader, setLoader] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("required").min(3, "Atleast 3 characters"),
    email: Yup.string().email("Invalid Email Address").required("required"),
    password: Yup.string()
      .required("required")
      .min(8, "not less than 8 characters"),
  });
  const submitForm = async (values) => {
    if (!values.name || !values.email || !values.password) {
      return;
    }
    setLoader(true);
    const { name, email, password } = values;
    const type = "register";
    const body = { name, email, password };

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
      <h3 className="text-center mb-3">User Registration Form</h3>
      <div className="m-auto col-sm-8 col-md-8  col-lg-6 card p-5 shadow ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {(formik) => {
            return (
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3 ">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="form-text text-danger">
                      {formik.errors.name}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
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
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-outline-primary ">
                    Register
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

export default Register;
