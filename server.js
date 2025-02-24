const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000; // Use dynamic port for Vercel
const db = new sqlite3.Database("./users.db");

app.use(express.json());
app.use(cors()); // Allow frontend requests

// Serve Static Files
app.use(express.static("public"));

// Create users table
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT)");

// Register Endpoint
app.post("/register", (req, res) => {
    const { email, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash], function (err) {
            if (err) return res.status(400).json({ message: "User already exists" });
            res.json({ message: "User registered successfully" });
        });
    });
});

// Login Endpoint
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
        if (err || !user) return res.status(400).json({ message: "Invalid email or password" });

        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) return res.status(400).json({ message: "Invalid email or password" });

            res.json({ message: "Login successful", user: { email: user.email } });
        });
    });
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app; // Required for Vercel