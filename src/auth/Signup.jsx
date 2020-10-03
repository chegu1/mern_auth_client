import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth } from "./helpers";

const Signup = () => {
  const [values, setValues] = useState({
    name: "chegu mani",
    email: "chegu.mani9@gmail.com",
    password: "beerus123$",
    buttonText: "Submit",
  });

  const { name, email, password, buttonText } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password },
    })
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submited",
        });
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error.response.data, "signup");
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };
  const signupForm = () => (
    <form className="mt-2">
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Name
        </label>
        <input
          onChange={handleChange("name")}
          type="text"
          value={name}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Email
        </label>
        <input
          onChange={handleChange("email")}
          type="email"
          value={email}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Password
        </label>
        <input
          onChange={handleChange("password")}
          type="password"
          value={password}
          className="form-control"
        />
      </div>
      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null}
        <h2 className="p-5 text-center">Signup</h2>
        {signupForm()}
      </div>
    </Layout>
  );
};

export default Signup;
