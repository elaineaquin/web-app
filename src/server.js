const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_database_url' with your MongoDB connection string)
mongoose.connect("mongodb://localhost:27017/informations", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Define MongoDB Schema and Model for User
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const eventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  className: String,
  lab: String, // Add lab field
  isAnonymous: Boolean, // Add isAnonymous field
});

const Event = mongoose.model("Event", eventSchema);

app.post("/api/reserve", async (req, res) => {
  try {
    const { lab, date, time, isAnonymous, username } = req.body;

    const start = new Date(`${date}T${time}`);
   // const end = new Date(`${date}T${time}`);

    const newEvent = new Event({
      title: isAnonymous ? 'Reserved (Anonymous)' : `Reserved by ${username}`,
      start,
     // end,
      className: "reserved-event",
      lab,
      isAnonymous,
    });

    await newEvent.save();
    res.status(200).json({ success: true, message: "Reservation successful", event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// API endpoint for user registration
app.post("/api/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API endpoint for user login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (user) {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Passwords match, send a success response with username
        res.status(200).json({ message: "User logged in successfully", username: user.username });
      } else {
        // Passwords don't match, send an error response
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      // User not found, send an error response
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/api/events", async (req, res) => {
  try {
    const { title, start, end, className } = req.body;
    const newEvent = new Event({ title, start, end, className });
    await newEvent.save();
    res.status(200).json({ message: "Event created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
