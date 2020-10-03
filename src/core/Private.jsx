import React, { useState, useEffect } from "react";
// import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth, getCookie, signout, updateUser } from "../auth/helpers";

const Private = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    buttonText: "Submit",
  });
  const token = getCookie("token");
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        const { role, name, email } = res.data.user;
        setValues({ ...values, role, name, email });
      })
      .catch((error) => {
        console.log("profile update error", error);
        if (error.res.status === 401) {
          signout(() => {
            history.push("/");
          });
        }
      });
  };

  const { name, email, role, password, buttonText } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { name, password },
    })
      .then((response) => {
        updateUser(response, () => {
          setValues({
            ...values,
            buttonText: "Submited",
          });
          toast.success("Profile updated successfully");
        });
      })
      .catch((error) => {
        console.log(error.response.data, "signup");
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };
  const updateForm = () => (
    <form className="mt-2">
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Role
        </label>
        <input
          type="text"
          defaultValue={role}
          className="form-control"
          disabled
        />
      </div>
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
          disabled
          type="email"
          defaultValue={email}
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
        <h2 className="pt-5 text-center">Private Route</h2>
        <p className="lead text-center">Profile Update</p>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Private;
