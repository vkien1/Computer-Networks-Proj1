const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const cors = require("cors");
const path = require("path");

const app = express();
const db = new sqlite3.Database("./users.db");

app.use(express.json());
app.use(cors()); // Allow frontend requests

// ✅ Serve Static Files (Ensure `auth.html` and `index.html` are in `public/`)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Create users table if it doesn't exist
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT)");

// ✅ Register Endpoint
app.post("/register", (req, res) => {
    const { email, password } = req.body;

    // Hash password before storing
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hash], function (err) {
            if (err) return res.status(400).json({ message: "User already exists" });
            res.json({ message: "User registered successfully" });
        });
    });
});

// ✅ Login Endpoint
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

// ✅ Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
