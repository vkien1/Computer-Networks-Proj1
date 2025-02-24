const express = require("express");
const { Pool } = require("pg"); // ✅ PostgreSQL Client
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // ✅ Allow frontend requests

// ✅ Connect to Supabase (PostgreSQL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ✅ Use your Supabase database URL
  ssl: { rejectUnauthorized: false } // ✅ Required for cloud databases
});

// ✅ Create Users Table
const createUsersTable = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);
};
createUsersTable();

// ✅ Register Endpoint
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);
        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(400).json({ message: "User already exists or database error" });
    }
});

// ✅ Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json({ message: "Invalid email or password" });

        res.json({ message: "Login successful", user: { email: user.email } });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app; // ✅ Required for Vercel