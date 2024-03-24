import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

let loggedInUser = null;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful. User data:", data.username);
        console.log("User logged in successfully", data.username);
        loggedInUser = data.username; // Set the logged-in user dynamically
        navigate("/home"); // Redirect to Home.jsx page
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const goToRegistration = () => {
    navigate("/register");
  };

  return (
    <html>
      <style>
        {" "}
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </style>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Lab Reservation System
          </a>
        </nav>
        <div
          style={{
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div className="container mt-4">
            <section id="login-form">
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label style={{ display: "block" }} htmlFor="setEmail">
                    DLSU Email
                  </label>
                  <input
                    style={{ display: "inline-block", width: "50%" }}
                    type="email"
                    className="form-control"
                    id="setEmail"
                    placeholder="Enter your DLSU email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: "block" }} htmlFor="setPassword">
                    Password
                  </label>
                  <input
                    style={{ display: "inline-block", width: "50%" }}
                    type="password"
                    className="form-control"
                    id="setPassword"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <button type="submit" className="btn btn-primary mr-2">
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={goToRegistration}
                >
                  Don't have an account? Register here
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </html>
  );
};

export default Login;
export { loggedInUser };