const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const posts = require("./posts");
const requireAuth = require("./middleware/requireAuth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * LANDING PAGE (más atractivo que JSON)
 * Ruta: GET /
 */
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.send(`<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Hybridge Blog API</title>
  <style>
    :root{
      --bg1:#0b1220;
      --bg2:#111a2e;
      --card: rgba(255,255,255,.08);
      --border: rgba(255,255,255,.14);
      --text: rgba(255,255,255,.92);
      --muted: rgba(255,255,255,.70);
      --btn: rgba(255,255,255,.12);
      --btnHover: rgba(255,255,255,.18);
      --accent: #7dd3fc;
    }
    *{box-sizing:border-box}
    body{
      margin:0;
      min-height:100vh;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Helvetica Neue";
      color: var(--text);
      background:
        radial-gradient(900px 600px at 20% 10%, rgba(125,211,252,.18), transparent 60%),
        radial-gradient(900px 600px at 90% 20%, rgba(167,139,250,.16), transparent 60%),
        linear-gradient(120deg, var(--bg1), var(--bg2));
      display:flex;
      align-items:center;
      justify-content:center;
      padding: 28px 18px;
    }
    .wrap{width:min(980px, 100%)}
    .badge{
      display:inline-flex;
      gap:10px;
      align-items:center;
      padding:10px 14px;
      border: 1px solid var(--border);
      background: rgba(0,0,0,.18);
      border-radius:999px;
      font-size:14px;
      color: var(--muted);
      backdrop-filter: blur(8px);
    }
    .dot{
      width:10px;height:10px;border-radius:999px;
      background: #22c55e;
      box-shadow: 0 0 0 6px rgba(34,197,94,.12);
    }
    h1{
      margin: 18px 0 10px 0;
      font-size: clamp(28px, 4vw, 44px);
      letter-spacing: -0.02em;
      line-height:1.1;
    }
    p{
      margin: 0 0 18px 0;
      color: var(--muted);
      font-size: 16px;
      line-height: 1.6;
      max-width: 70ch;
    }
    .grid{
      display:grid;
      grid-template-columns: 1.2fr .8fr;
      gap: 16px;
      margin-top: 18px;
    }
    @media (max-width: 860px){
      .grid{grid-template-columns: 1fr}
    }
    .card{
      border: 1px solid var(--border);
      background: var(--card);
      border-radius: 18px;
      padding: 18px;
      backdrop-filter: blur(10px);
      box-shadow: 0 14px 40px rgba(0,0,0,.25);
    }
    .card h2{
      margin:0 0 10px 0;
      font-size: 18px;
      letter-spacing:-0.01em;
    }
    .list{
      margin:0;
      padding-left: 18px;
      color: var(--muted);
      line-height: 1.7;
      font-size: 14.5px;
    }
    .btns{
      display:flex;
      flex-wrap:wrap;
      gap:10px;
      margin-top: 14px;
    }
    a.btn{
      display:inline-flex;
      align-items:center;
      gap:10px;
      text-decoration:none;
      color: var(--text);
      border: 1px solid var(--border);
      background: var(--btn);
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 14px;
      transition: .15s ease;
    }
    a.btn:hover{background: var(--btnHover); transform: translateY(-1px)}
    code{
      display:block;
      white-space:pre-wrap;
      word-break:break-word;
      background: rgba(0,0,0,.22);
      border: 1px solid rgba(255,255,255,.10);
      color: rgba(255,255,255,.88);
      padding: 12px 12px;
      border-radius: 12px;
      font-size: 13px;
      line-height:1.55;
      margin-top: 10px;
    }
    .footer{
      margin-top: 14px;
      color: rgba(255,255,255,.55);
      font-size: 12.5px;
    }
    .accent{color: var(--accent)}
  </style>
</head>
<body>
  <main class="wrap">
    <div class="badge"><span class="dot"></span> API en línea • Node + Express + JWT</div>

    <h1>Hybridge Blog API <span class="accent">(Producción)</span></h1>
    <p>
      API REST simple para gestionar posts. Incluye autenticación con JWT y rutas protegidas.
      Usa los botones para probar el estado del servicio y ver cómo consumir la API.
    </p>

    <section class="grid">
      <div class="card">
        <h2>Probar rápido</h2>
        <div class="btns">
          <a class="btn" href="/salud">✅ /salud (health check)</a>
          <a class="btn" href="/api/posts">🔒 /api/posts (requiere token)</a>
        </div>

        <code>GET /salud
Respuesta:
{ "status": "ok" }</code>

        <code>GET /api/posts
Header requerido:
Authorization: Bearer &lt;TOKEN&gt;</code>
      </div>

      <div class="card">
        <h2>Login (POST)</h2>
        <p style="margin:0;color:var(--muted);font-size:14.5px;">
          Esta ruta es POST, por eso en el navegador verás “Cannot GET”.
          Pruébala en Postman / Thunder Client / curl.
        </p>

        <code>POST /api/login
Body JSON:
{
  "email": "ivan.martinez@hybridge.education",
  "password": "Hybridge2025"
}</code>

        <code>Respuesta:
{ "token": "..." }</code>

        <div class="footer">
          Tip: si quieres, después te dejo pruebas completas para Postman y capturas exactas para tu entrega.
        </div>
      </div>
    </section>
  </main>
</body>
</html>`);
});

/**
 * HEALTH CHECK
 * Ruta: GET /salud
 */
app.get("/salud", (req, res) => {
  res.json({ status: "ok" });
});

/**
 * LOGIN
 * Ruta: POST /api/login
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

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "JWT_SECRET no configurado" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
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
    author,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
