import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.config";

import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
const auth = getAuth(app);

const Register = () => {
  const [sucessMessage, setSuccessMessage] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 

  const handleRegister = (event) => {
    event.preventDefault();
    const from = event.target;
    const name = from.name.value;
    const email = from.email.value;
    const password = from.password.value;
    console.log(name, email, password);

    setNameErr("");
    setEmailErr("");
    setPasswordErr("");
    setSuccessMessage("");

    if (name === "") {
      setNameErr("Enter your name*");
    } else if (!isNaN(name)) {
      setNameErr("Only Characters are allowed*");
    }

    if (email === "") {
      setEmailErr("Enter valid email*");
    } else if (!isNaN(email)) {
      setNameErr("Only Characters are allowed*");
    }

    if (password === "") {
      setPasswordErr("Enter password*");
      return;
    } else if (password.length < 8) {
      setPasswordErr("Password length must be atleast 8 characters*");
      return;
    } else if (password.length >= 15) {
      setPasswordErr("Password length must not exceed 15 characters*");
      return;
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordErr("Password must be at leaset one uppercase");
      return;
    } else if (!/(?=.*[@$!%#*?&])/.test(password)) {
      setPasswordErr("Password must be at leaset one special carecture");
      return;
    } else if (!/[0-9]/.test(password)) {
      setPasswordErr("Password must be at leaset one number");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedEmail = result.user;
        console.log(loggedEmail);
        setSuccessMessage("Account has been created successfully");
        event.target.reset();
        varifiedEmail(loggedEmail);
        proFileUpdate(loggedEmail, name);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const varifiedEmail = (user) => {
    sendEmailVerification(user).then((result) => {
      alert("Please verify your email");
    });
  };
  const proFileUpdate = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then((result) => {
        console.log("user name updated");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container>
      <div className="w-50 mx-auto   border p-5 mt-5 rounded-3">
        <h3 className="text-center mt-2">Plaese Register</h3>
        <div>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Enter name"
              />
              <p className="text-danger">{nameErr}</p>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
              <p className="text-danger">{emailErr}</p>
            </Form.Group>

            <Form.Group className="mb-3 position-relative">
              <Form.Label>Password</Form.Label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter Password"
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
              <p className="text-danger">{passwordErr}</p>
            </Form.Group>

            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <p className="mt-2">
              Already have account?{" "}
              <Link className="fs-5 text-decoration-none" to="/login">
                Login Here
              </Link>
            </p>
            <p className="text-success text-center fs-2">{sucessMessage}</p>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
