import React, { useState, useEffect } from "react";
import FullCalendar from "fullcalendar-reactwrapper";
import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { useNavigate } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import axios from "axios";
import { toast } from "react-toastify";
import { loggedInUser } from "../pages/Login";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/events");
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          const data = await response.json();
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); // Run once on component mount

  useEffect(() => {
    // Check if the user is logged in (you might need to adjust this based on your authentication logic)
    const userLoggedIn = true; // Replace with your actual check
    if (userLoggedIn) {
      setUsername(loggedInUser);
      setIsLoggedIn(true);
    } else {
      // Redirect to the login page if not logged in
      navigate("/");
    }
  }, [navigate]); // Include navigate in the dependency array to prevent React warnings

  const handleReserve = async () => {
    const lab = document.getElementById("lab").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const isAnonymous = document.getElementById("anonymous").checked;

    try {
      const response = await axios.post("http://localhost:3001/api/reserve", {
        lab,
        date,
        time,
        isAnonymous,
        username,
      });

      if (response.data.success) {
        toast.success("Reservation successful!");
        // Optionally, update the local events state to reflect the new reservation
        setEvents([...events, response.data.event]);
      } else {
        toast.error("Reservation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error reserving:", error);
      toast.error("Reservation failed. Please try again.");
    }
  };

  const handleLogout = () => {
    // Your logout logic here
    console.log("User logged out successfully");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to the login page after logout
  };

  const handleAbout = () => {
    navigate("/about"); // Redirect to the login page after logout
  };

  return (
    <html>
      <body>
        {/* Bootstrap JS and other scripts */}
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />

        {/* FullCalendar JavaScript dependencies */}
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>

        {/* FullCalendar JavaScript */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.10.2/fullcalendar.min.js"></script>

        <div>
          <style>
            {`
            .flex-container {
      display: flex;
      justify-content: space-between;
      margin: 0 -10px;
    }

    .calendar-container {
      width: 100%; /* Adjust the width as needed */
    }

    .reserve-form {
      width: 50%; /* Adjust the width as needed */
      padding: 0 40px;
    }
          .welcome-popup {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #ffffff;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
        `}
          </style>

          {/* Navigation Bar */}
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#">Lab Reservation System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {isLoggedIn ? (
                  <NavDropdown
                    title={`Hello, ${username}`}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item onClick={handleAbout}>
                      About
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Button variant="outline-light" onClick={handleLogout}>
                    Logout
                  </Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {/* Main Content Area */}
          <div className="container mt-4">
            {/* Reserve Section */}
            <section id="reserve">
              <h2>Reserve</h2>

              <div className="flex-container">
                {/* Calendar */}
                <div className="content home calendar-container">
                  <FullCalendar
                    id="scheduling"
                    header={{
                      left: "prev,next today",
                      center: "title",
                      right: "month,agendaWeek,agendaDay",
                    }}
                    events={events.map((event) => ({
                      title: `${event.title} - ${event.lab}`, // Display lab name along with title
                      start: event.start,
                      end: event.end,
                      className: event.className,
                      lab: event.lab, // Include lab name in the event object
                    }))}
                  />
                </div>

                {/* Reserve Form */}
                <form className="reserve-form">
                  <div className="form-group">
                    <label htmlFor="lab">Select Lab</label>
                    <select className="form-control" id="lab">
                      <option value="" disabled selected required>
                        Select a Laboratory
                      </option>
                      <option>St Miguel Laboratory</option>
                      <option>St Joseph Laboratory</option>
                      <option>La Salle Hall Laboratory</option>
                    </select>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="date">Select Date</label>
                        <Flatpickr
                          id="date"
                          className="form-control"
                          options={{ enableTime: false, dateFormat: "Y-m-d" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="time">Select Time</label>
                        <Flatpickr
                          id="time"
                          className="form-control"
                          options={{
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: "H:i",
                            time_24hr: false,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="anonymous"
                    />
                    <label className="form-check-label" htmlFor="anonymous">
                      Reserve Anonymously
                    </label>
                  </div>
                  <br />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleReserve}
                  >
                    Reserve
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Home;
