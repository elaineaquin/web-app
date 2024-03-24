import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (response.ok) {
        console.log("User registered successfully");
        navigate("/"); // Redirect to login page after registration
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  const goToLogin = () => {
    navigate("/");
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      />
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

      <body
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
          <div className="container mt-4" style={{ maxWidth: "800px" }}>
            <section id="sign-form">
              <h2 style={{ marginBottom: "30px" }}>Register Account</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6 d-flex align-items-center">
                    <label
                      style={{ marginRight: "10px", marginTop: "auto" }}
                      htmlFor="setNameL"
                    >
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="setNameL"
                      name="name"
                      placeholder="Enter your Name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6 d-flex align-items-center">
                    <label
                      style={{ marginRight: "10px", marginTop: "auto" }}
                      htmlFor="setUserL"
                    >
                      Username:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="setUserL"
                      name="username"
                      placeholder="Enter your Username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div
                    className="form-group col"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <label
                      style={{ marginRight: "10px", marginTop: "auto" }}
                      htmlFor="signupEmail"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="signupEmail"
                      name="email"
                      placeholder="Enter your DLSU email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div
                    className="form-group col"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <label
                      style={{ marginRight: "10px", marginTop: "auto" }}
                      htmlFor="signupPassword"
                    >
                      Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      id="signupPassword"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mr-2">
                  Register
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={goToLogin}
                >
                  Already have an account? Login here
                </button>
              </form>
            </section>
          </div>
        </div>
      </body>
    </div>
  );
};

export default SignUp;
