import { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../../../core/actions/auth.js";

import { Buttons } from "../../../shared/Button";

function Register({ register }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const {
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
    age,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(password);
    console.log(confirmPassword);

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      await register({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        age: age,
      });

      setUserCreated(true);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (userCreated) {
    return <Redirect to="/login?user=true" />;
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
          <h3 className="card-title text-center">Sign up to Social Platform</h3>
          <div className="card-text">
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
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="firstName"
                  name="firstName"
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  className="form-control form-control-sm"
                  id="lastName"
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  name="age"
                  type="number"
                  className="form-control form-control-sm"
                  id="age"
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="email"
                  name="email"
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  type="text"
                  className="form-control form-control-sm"
                  id="username"
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
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control form-control-sm"
                  id="confirmPassword"
                  onChange={onChange}
                  required
                />
              </div>

              <div className="text-center">
                <Buttons.primary text="Sign Up" isLoading={isLoading} />
              </div>

              <div className="sign-up">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { register })(Register);
