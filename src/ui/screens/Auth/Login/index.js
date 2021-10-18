/* eslint-disable react/jsx-pascal-case */
import { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import { login } from "../../../../core/actions/auth.js";
import { Buttons } from "../../../shared/Button/index.js";
import "./index.css";

function Login({ login, isAuthenticated }) {
  const location = useLocation();
  let search = new URLSearchParams(location.search);
  const user = search.get("user");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      setIsLoading(true);

      await login(username, password);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="global-container">
      <div className="card login-form">
        <div className="card-body">
          <div className="text-center">
            <img
              src="https://i.pinimg.com/originals/61/cc/9d/61cc9def6b38e1eafbea081f7827019d.gif"
              alt=""
              height="100px"
            />
          </div>
          <h3 className="card-title text-center">Log in to Social Platform</h3>

          <div className="card-text">
            {user === "true" ? (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                User successfully created
              </div>
            ) : null}
            {error ? (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {error}
              </div>
            ) : null}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="username"
                  name="username"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control form-control-sm"
                  id="password"
                  onChange={onChange}
                  required
                  //   isInvalid
                />
              </div>

              <div className="text-center">
                <Buttons.primary text="Sign in" isLoading={isLoading} />
              </div>

              <div className="sign-up">
                Don't have an account? <Link to="/register">Create One</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state?.authReducer?.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
