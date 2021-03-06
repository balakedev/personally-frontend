import React from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./core/Menu";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import Users from "./user/Users";
import PrivateRoute from "./auth/PrivateRoute";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/user/:userId" component={Profile} />
      <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
      <Route exact path="/users/" component={Users} />
    </Switch>
  </div>
);
export default MainRouter;
