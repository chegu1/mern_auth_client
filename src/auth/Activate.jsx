import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import jwt from "jsonwebtoken";
import "react-toastify/dist/ReactToastify.min.css";

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    console.log(name, token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, show } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token },
    })
      .then((res) => {
        console.log("account activation", res);
        setValues({
          ...values,
          show: false,
        });
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error.response.data, "signup");
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <div className="text-center">
      <h2 className="p-5">Hey, {name}, Ready to activate your account</h2>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
