import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.config";

import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
const auth = getAuth(app);

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState("");
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    const from = event.target;
    const email = from.email.value;
    const password = from.password.value;
    console.log(email, password);

    setLoginSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((resuult) => {
        const loggedUser = resuult.user;
        console.log(loggedUser);
        if (!loggedUser.emailVerified) {
          alert("Your email is not verified, check your email box");
          return;
        }
        setLoginSuccess("Login Successful");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please provide your email address to reset password");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container>
      <div className="w-50  mx-auto border p-5 mt-5 rounded-3">
        <h3 className="text-center mt-2">Plaese Login</h3>
        <div>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
                ref={emailRef}
              />
            </Form.Group>

            <Form.Group className="mb-3 position-relative">
              <Form.Label>Password</Form.Label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Password"
              />
              {!showPassword ? (
                <FontAwesomeIcon
                  onClick={() => setShowPassword(true)}
                  className="position-absolute"
                  style={{ top: "45px", right: "10px" }}
                  icon={faEyeSlash}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={() => setShowPassword(false)}
                  className="position-absolute"
                  style={{ top: "45px", right: "10px" }}
                  icon={faEye}
                />
              )}
            </Form.Group>
            <div className="d-lg-flex align-items-center">
              <button type="submit" className="btn btn-success">
                Login
              </button>
              <p className="ps-lg-5 pt-3">
                Forget Your{" "}
                <Link
                  onClick={handleResetPassword}
                  className="text-decoration-none"
                >
                  Password <span className="text-dark">?</span>
                </Link>
              </p>
            </div>

            <p className="mt-2">
              New user?{" "}
              <Link className="fs-5 text-decoration-none" to="/register">
                Register Here
              </Link>
            </p>
            <p className="text-success text-center fs-2">{loginSuccess}</p>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
