import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [credential, setcredential] = useState({
    email: "",
    password: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();

    const responce = await fetch(
      "https://food-server-api.onrender.com/loginuser",
      {
        method: "POST",
        body: JSON.stringify(credential),
        headers: { "Content-Type": "application/json" },
      }
    );
    const output = await responce.json();

    if (output.success) {
      localStorage.setItem("useremail", credential.email);
      localStorage.setItem("authtoken", output.authtoken);
      navigate("/");
    } else {
      alert("Enter valid credential");
    }
  };

  const onchanges = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {" "}
      <div className="container fw-bold">
        <div
          style={{ width: "100%" }}
          className="btn btn-primary mt-1 mb-2 fw-bold"
        >
          Login Form
        </div>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              onChange={onchanges}
              name="email"
              value={credential.email}
              type="email"
              className="form-control"
              id="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={onchanges}
              name="password"
              value={credential.password}
              type="password"
              className="form-control"
              id="password"
            />
          </div>

          <button type="submit" className=" m-3 btn btn-success fw-bold">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger fw-bold">
            I' am a new user?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
