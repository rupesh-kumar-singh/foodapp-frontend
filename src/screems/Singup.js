import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Singup = () => {
  const navigate = useNavigate();
  const [credential, setcredential] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();

    const responce = await fetch(
      "https://food-server-api.onrender.com/createuser",
      {
        method: "POST",
        body: JSON.stringify(credential),
        headers: { "Content-Type": "application/json" },
      }
    );
    const output = await responce.json();

    if (!output.success) {
      alert("Enter valid credential");
    }
    if (output.success) {
      navigate("/login");
    }
  };

  const onchanges = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container text-black fw-bold">
        <div
          style={{ width: "100%" }}
          className="btn btn-primary mt-3 mb-3 fw-bold"
        >
          Sign up Form
        </div>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              onChange={onchanges}
              name="name"
              value={credential.name}
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
            />
          </div>
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
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              onChange={onchanges}
              name="location"
              value={credential.location}
              type="location"
              className="form-control"
              id="location"
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
          <Link to="/login" className="m-3 btn btn-danger fw-bold">
            Already a User
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Singup;
