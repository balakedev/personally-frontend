import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "darkgrey" };
  else return { color: "green" };
};

const Menu = ({ history }) => (
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">
          Personally
        </Link>
      </div>
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/users")}
            to="/users"
          >
            Users
          </Link>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                <span className="glyphicon glyphicon-user" /> Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                <span className="glyphicon glyphicon-log-in" /> Login
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                to={`/user/${isAuthenticated().user._id}`}
              >
                {`${isAuthenticated().user.username}`}
              </Link>
            </li>
            <li
              className="nav-item"
              className="nav-link"
              onClick={() => signout(() => history.push("/"))}
            >
              {" "}
              signout
            </li>
          </>
        )}
      </ul>
    </div>
  </nav>
);

export default withRouter(Menu);
