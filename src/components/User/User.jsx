import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const User = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [margin, setMargin] = useState({ top: 0, right: 0, bottom: 0, left: 0 });

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit =(event) => {
    event.preventDefault();
  }


  const isNameValid = name.length > 0;
  const isEmailValid = email.length > 0 && email.includes("@");
  const isPasswordValid = password.length > 8;

const handleMouseOver = () => {
    const randomMargin = {
      top: Math.floor(Math.random() * 200),
      right: Math.floor(Math.random() * 200),
      bottom: Math.floor(Math.random() * 200),
      left: Math.floor(Math.random() * 200)
    };
    setMargin(randomMargin);
  };


  const buttonStyle = {
    margin: (isNameValid && isEmailValid && isPasswordValid)  || `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`,
    transition: "margin 0.3s ease-out",
    backgroundColor : (isNameValid && isEmailValid && isPasswordValid) || 'red'
    
  };

  return (
    <Container>
      <div className="w-50 mx-auto   border p-5 mt-5 rounded-3">
        <h3 className="text-center mt-2">Plaese Register</h3>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <input
                onChange={handleNameChange}
                name="name"
                type="text"
                className="form-control"
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <input
                onChange={handleEmailChange}
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3 position-relative">
              <Form.Label>Password</Form.Label>
              <input onChange={handlePasswordChange}
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
            </Form.Group>

            <button
            style={buttonStyle}
            onMouseOver={handleMouseOver}
            type="submit" className="btn btn-primary">
              Register
            </button>
            <p className="mt-2">
              Already have an account ?{" "}
              <Link className="fs-5 text-decoration-none" to="/login">
                Login Here
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default User;
