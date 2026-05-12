import React, { useState } from "react";
import "./Register.css";
import Header from "../Header/Header";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin + "/djangoapp/register";

    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem("username", json.userName);
      sessionStorage.setItem("firstname", firstName);
      sessionStorage.setItem("lastname", lastName);
      sessionStorage.setItem("email", email);
      gohome();
    } else if (json.error === "Already Registered") {
      alert("The user with the same username is already registered");
      gohome();
    }
  };

  return (
    <div>
      <Header />
      <div className="register_container" style={{ width: "50%" }}>
        <h1 style={{ color: "darkblue" }}>Sign Up</h1>
        <form className="register_form">
          <div>
            <span className="input_field">Username </span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input_field"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <span className="input_field">Password </span>
            <input
              type="password"
              name="psw"
              placeholder="Password"
              className="input_field"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <span className="input_field">First Name </span>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input_field"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <span className="input_field">Last Name </span>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input_field"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <span className="input_field">Email </span>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input_field"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="action_button"
              type="submit"
              value="Register"
              onClick={register}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
