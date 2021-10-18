import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../core/actions/auth.js";

function Nav({ logout, isAuthenticated }) {
  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark bg-dark"
      style={{ justifyContent: "center" }}
    >
      {/* <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample08"
        aria-controls="navbarsExample08"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button> */}

      <div
        style={{ justifyContent: "center" }}
        className=" navbar-expand justify-content-md-center"
        id="navbarsExample08"
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Social Platform
            </a>
          </li>

          {isAuthenticated ? (
            <React.Fragment>
              <li className="nav-item ml-auto">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item ml-auto">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </div>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state?.authReducer?.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Nav);
