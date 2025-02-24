const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// ✅ Serve Static Files from Public Directory
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve `auth.html` on root request
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "auth.html"));
});

// ✅ Register & Login Endpoints (Dummy for Testing)
app.post("/register", (req, res) => {
    res.json({ message: "Register endpoint working!" });
});

app.post("/login", (req, res) => {
    res.json({ message: "Login endpoint working!" });
});

// ✅ Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app; // Required for Vercel