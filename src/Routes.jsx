import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import Private from "./core/Private";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Admin from "./core/Admin";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AdminRoute path="/admin" exact component={Admin} />
        <PrivateRoute path="/private" exact component={Private} />
        <Route path="/auth/activate/:token" exact component={Activate} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
