import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout, updateUser } from "../auth/helpers";

const Layout = ({ children, history, match }) => {
  console.log(isAuth() && isAuth().updatedUser && isAuth().updatedUser.name);
  const isActive = (path) => {
    if (match.path === path) {
      return { color: "#000" };
    } else return { color: "white" };
  };
  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={isActive("/")}>
          Home
        </Link>
      </li>
      {!isAuth() && (
        <Fragment>
          <li className="nav-item">
            <Link style={isActive("/signup")} to="/signup" className="nav-link">
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link style={isActive("/signin")} to="/signin" className="nav-link">
              Signin
            </Link>
          </li>
        </Fragment>
      )}
      {isAuth() && isAuth().role === "admin" && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive("/admin")} to="/admin">
            {isAuth().name}
          </Link>
        </li>
      )}
      {isAuth() && isAuth().role === "subscriber" && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive("/private")} to="/private">
            {isAuth().name}
          </Link>
        </li>
      )}
      {isAuth() && (
        <li className="nav-item">
          <span
            style={{ cursor: "pointer", color: "white" }}
            className="nav-link"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  );
  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
