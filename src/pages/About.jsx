import React, { useState } from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <html>
      <body>
        <style>
          {`
        body {
            font-family: Arial, sans-serif;
            background-color: #7e7e7e;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
        }

        .container {
            background-color: #fff;
            border-radius: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            
            width: 700px;
        }

        .label {
            display: block;
            margin-bottom: 10px;
        }

        .input {
            padding: 8px;
            margin-bottom: 10px;
        }

        .button {
            padding: 10px 20px;
            background-color: #4caf50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .button:hover {
            background-color: #45a049;
        }

        .p {
            font-size: 18px;
            margin-top: 20px;
            color: #333;
            text-align: center;
        }
    `}
        </style>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <div className="container">
          <h1>About</h1>
          <h3>Installation</h3>
          <p>
            This project requires Node.js and npm (or yarn) to be installed on
            your system. To set up the development environment, folow these
            steps:<br></br>
            <br></br>
            1. <b>Clone the repository:</b>
            <br></br>
            &nbsp;&nbsp;&nbsp; git clone
            https://github.com/elaineaquin/web-app.git<br></br>
            <br></br>
            2. <b>Naviagte to the project directory</b>
            <br></br>
            &nbsp;&nbsp;&nbsp; cd web-app<br></br>
            <br></br>
            3. <b>Install dependencies</b>
            <br></br>
            &nbsp;&nbsp;&nbsp; npm install<br></br>
            <br></br>
            This will install all the necessary dependencies listed below:
            <br></br>
            <br></br>
            <b>Client-Side Dependencies</b>
            <br></br>
            <br></br>
            &nbsp;&nbsp;&nbsp; fullcalendar-reactwrapper: Integrates FullCalendar library into React projects.<br></br>
            &nbsp;&nbsp;&nbsp; react-flatpickr: Provides a sleek date/time picker component for React. <br></br>
            &nbsp;&nbsp;&nbsp; react-router-dom: Enables routing capabilities for React applications. <br></br>
            &nbsp;&nbsp;&nbsp; react-bootstrap: Provides Bootstrap UI components for React. <br></br>
            &nbsp;&nbsp;&nbsp; axios: HTTP client for making API requests from React applications. <br></br>
            &nbsp;&nbsp;&nbsp; react-toastify: Manages user notifications like toast messages.<br></br><br></br>
            <b>Server-Side Dependencies</b>
            <br></br>
            <br></br>
            &nbsp;&nbsp;&nbsp; express: Web framework for building Node.js applications.<br></br>
            &nbsp;&nbsp;&nbsp; mongoose: Object Document Mapper (ODM) for interacting with MongoDB databases from Node.js. <br></br>
            &nbsp;&nbsp;&nbsp; express-flash: Enables flash messages in Express applications. <br></br>
            &nbsp;&nbsp;&nbsp; express-session: Manages user sessions in Express applications. <br></br>
            &nbsp;&nbsp;&nbsp; passport: Authentication middleware for Express applications. <br></br>
            &nbsp;&nbsp;&nbsp; passport-local: Provides basic local authentication strategies for Passport.<br></br>
            &nbsp;&nbsp;&nbsp; passport-local-mongoose: Simplifies local authentication with Mongoose.<br></br>
            &nbsp;&nbsp;&nbsp; body-parser: Parses incoming request bodies in Express applications.<br></br>
            &nbsp;&nbsp;&nbsp; cors: Enables Cross-Origin Resource Sharing (CORS) for API requests.<br></br><br></br>
            Now run the server.js:<br></br>
            &nbsp;&nbsp;&nbsp; cd src <br></br>
            &nbsp;&nbsp;&nbsp; node server.js<br></br><br></br>
            Now run the server<br></br>
            &nbsp;&nbsp;&nbsp; npm start</p>
            <Link to="/home" className="back-button">Back</Link>  
        </div>
      </body>
    </html>
  );
}

export default About;
