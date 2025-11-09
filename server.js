const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGO_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "ReactsignupDB";
let usersCollection;

// ---------- CONNECT DATABASE ----------
async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    const db = client.db(DB_NAME);
    usersCollection = db.collection("users");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
connectDB();

// ---------- ROUTES ----------

// Test API
app.get("", (req, res) => res.send("✅ MongoDB connected"));
app.get("/api", (req, res) => res.send("🚀 API is running!"));

// Fetch all users (debug)
app.get("/api/users", async (req, res) => {
  try {
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ---------- Signup ----------
app.post("/api/signup", async (req, res) => {
  const { name, phone, email, password } = req.body;

  if (!name || !phone || !email || !password)
    return res.status(400).json({ message: "All fields are required." });

  try {
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists." });

    // ⚠️ Directly storing password (for testing only)
    await usersCollection.insertOne({ name, phone, email, password });
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// ---------- Login ----------
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required." });

  try {
    const user = await usersCollection.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    // ✅ Plain comparison
    if (user.password !== password)
      return res.status(401).json({ message: "Invalid password." });

    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// ---------- Reset Password ----------
app.post("/api/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword)
    return res.status(400).json({ message: "Email and new password required." });

  try {
    const user = await usersCollection.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    // ✅ Plain text update
    await usersCollection.updateOne({ email }, { $set: { password: newPassword } });

    res.json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

//👉 “For any unknown route, send index.html.”
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ---------- Start Server ----------
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
