import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "./Accounts.css";

export default function Accounts() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/Todo");
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/Todo");
      })
      .catch((err) => alert(err.message));
  };

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Please confirm that email are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmPassword
    ) {
      alert("Please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/Todo");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="main-div">
      <div className="child-div">
        {isRegistering ? (
          <>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              placeholder="Email"
              value={registerInformation.email}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value,
                })
              }
            />
            </div>
            <div className="mb-3">
            <input
              type="email"
              className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              placeholder="Confirm Email"
              value={registerInformation.confirmEmail}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmEmail: e.target.value,
                })
              }
            />
            </div>
            <div className="mb-3">
            <input
              type="password"
              className="form-control"
                id="exampleInputPassword1"
              placeholder="Password"
              value={registerInformation.password}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value,
                })
              }
            />
            </div>
            <div className="mb-3">
            <input
              type="password"
              className="form-control"
                id="exampleInputPassword1"
              placeholder="Confirm Password"
              value={registerInformation.confirmPassword}
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmPassword: e.target.value,
                })
              }
            />
            </div>
            <button className="btn btn-primary" onClick={handleRegister}>
              Register
            </button>
            <div className="newAccount">
            <span className="newUser">Already SingUp?
            <button
              className="singUp"
              onClick={() => setIsRegistering(false)}
            >
              Log In
            </button></span></div>
          </>
        ) : (
          <>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
                onChange={handleEmailChange}
                value={email}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email and password with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handlePasswordChange}
                value={password}
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSignIn}
            >
              Submit
            </button>
            <div className="newAccount">
            <span className="newUser">New User?
            <button className="singUp" onClick={() => setIsRegistering(true)}>
              SingUp
            </button></span></div>
          </>
        )}
      </div>
    </div>
  );
}

