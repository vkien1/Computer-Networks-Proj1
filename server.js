const express = require("express");
const path = require("path");
const { Pool } = require("pg"); // ✅ PostgreSQL Client for Supabase
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// ✅ Enable JSON parsing & CORS
app.use(express.json());
app.use(cors());

// ✅ PostgreSQL Connection (Supabase)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ✅ Use your Supabase DB URL
  ssl: { rejectUnauthorized: false } // ✅ Required for cloud databases like Supabase
});

// ✅ Ensure Users Table Exists
const createUsersTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);
        console.log("✅ Users table is ready.");
    } catch (error) {
        console.error("❌ Error creating users table:", error);
    }
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
        console.error("❌ Registration Error:", error);
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
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve `auth.html` as Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "auth.html"));
});

// ✅ Handle 404 Errors
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

// ✅ Start Server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

module.exports = app; // ✅ Required for Vercel
