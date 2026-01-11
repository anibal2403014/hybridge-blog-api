const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const posts = require("./posts");
const requireAuth = require("./middleware/requireAuth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ruta base (prueba Render)
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de Hybridge Blog Posts" });
});

/**
 * LOGIN
 * Credenciales de prueba
 */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  const EMAIL_OK = "ivan.martinez@hybridge.education";
  const PASS_OK = "Hybridge2025";

  if (email !== EMAIL_OK || password !== PASS_OK) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// GET posts (PROTEGIDO)
app.get("/api/posts", requireAuth, (req, res) => {
  res.json(posts);
});

// POST crear post (PROTEGIDO)
app.post("/api/posts", requireAuth, (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ error: "Faltan datos del post" });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
