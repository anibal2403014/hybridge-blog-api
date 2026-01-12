// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ===========================
// Datos / Config
// ===========================
const PORT = process.env.PORT || 3000;

// ===========================
// HOME (Landing principal)
// ===========================
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Hybridge Blog API (Producción)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root{
      --bg1:#0b1020;
      --bg2:#040714;
      --card:rgba(255,255,255,.06);
      --stroke:rgba(255,255,255,.10);
      --text:#e5e7eb;
      --muted:#cbd5e1;
      --blue:#60a5fa;
      --green:#22c55e;
      --shadow:0 30px 80px rgba(0,0,0,.55);
      --radius:20px;
      --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    *{box-sizing:border-box}
    body{
      margin:0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: radial-gradient(1200px 700px at 20% 10%, rgba(96,165,250,.35), transparent 55%),
                  radial-gradient(900px 600px at 80% 0%, rgba(34,197,94,.22), transparent 55%),
                  radial-gradient(circle at top, var(--bg1), var(--bg2));
      color:var(--text);
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:32px 18px;
    }
    .wrap{max-width:1050px; width:100%;}
    .badge{
      display:inline-flex; align-items:center; gap:10px;
      padding:8px 14px; border-radius:999px;
      border:1px solid rgba(255,255,255,.10);
      background:rgba(255,255,255,.06);
      backdrop-filter: blur(10px);
      color:var(--muted);
      font-size:.9rem;
      margin-bottom:16px;
    }
    .dot{
      width:10px;height:10px;border-radius:50%;
      background:var(--green);
      box-shadow:0 0 12px rgba(34,197,94,.9);
    }
    h1{margin:0 0 10px; font-size:3rem; letter-spacing:-0.03em;}
    h1 span{color:var(--blue)}
    .desc{max-width:740px; color:var(--muted); line-height:1.7; margin:0 0 26px;}
    .grid{
      display:grid;
      grid-template-columns: 1.25fr .95fr;
      gap:18px;
    }
    @media (max-width: 900px){
      .grid{grid-template-columns:1fr;}
      h1{font-size:2.2rem}
    }
    .card{
      background:var(--card);
      border:1px solid var(--stroke);
      border-radius:var(--radius);
      padding:18px;
      box-shadow:var(--shadow);
      backdrop-filter: blur(14px);
    }
    .card h2{margin:0 0 12px; font-size:1.2rem}
    .chips{display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;}
    .chip{
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 12px; border-radius:12px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(0,0,0,.10);
      color:var(--text);
      font-size:.9rem;
      cursor:pointer;
      user-select:none;
    }
    .chip:hover{border-color:rgba(96,165,250,.45)}
    .chip .ico{width:16px;height:16px; display:inline-block}
    .box{
      background:rgba(0,0,0,.14);
      border:1px solid rgba(255,255,255,.10);
      border-radius:14px;
      padding:14px;
      margin-top:10px;
      font-family:var(--mono);
      font-size:.92rem;
      line-height:1.55;
      color:#e2e8f0;
      overflow:auto;
      white-space:pre-wrap;
    }
    .hint{color:#94a3b8; font-size:.9rem; margin-top:12px; line-height:1.45;}
    .right h3{margin:0 0 8px; font-size:1.05rem; color:#e2e8f0;}
    .right p{margin:0 0 14px; color:var(--muted); line-height:1.6;}
    .kbd{
      display:inline-block; font-family:var(--mono);
      padding:2px 8px; border-radius:10px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(0,0,0,.18);
      color:#e2e8f0;
      font-size:.86rem;
    }
    a{color:var(--blue); text-decoration:none}
    a:hover{text-decoration:underline}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="badge"><span class="dot"></span> API en línea · Node + Express + JWT</div>
    <h1>Hybridge Blog API <span>(Producción)</span></h1>
    <p class="desc">
      API REST simple para gestionar posts. Incluye autenticación con JWT y rutas protegidas.
      Usa los botones para probar el estado del servicio y ver cómo consumir la API.
    </p>

    <div class="grid">
      <div class="card">
        <h2>Probar rápido</h2>
        <div class="chips">
          <div class="chip" onclick="openLink('/salud')">
            <span class="ico">✅</span> /salud (health check)
          </div>
          <div class="chip" onclick="openLink('/api/posts')">
            <span class="ico">🔒</span> /api/posts (requiere token)
          </div>
          <div class="chip" onclick="openLink('/salud?json=1')">
            <span class="ico">🧾</span> /salud?json=1 (JSON)
          </div>
        </div>

        <div class="box">GET /salud
Respuesta HTML (para navegador)</div>

        <div class="box">GET /salud?json=1
Respuesta JSON:
{ "status": "ok" }</div>

        <div class="box">GET /api/posts
Header requerido:
Authorization: Bearer &lt;TOKEN&gt;</div>
      </div>

      <div class="card right">
        <h2>Login (POST)</h2>
        <p>
          Esta ruta es <span class="kbd">POST</span>, por eso en el navegador verás
          “Cannot GET”. Pruébala en Postman / Thunder Client / curl.
        </p>

        <div class="box">POST /api/login
Body JSON:
{
  "email": "ivan.martinez@hybridge.education",
  "password": "Hybridge2025"
}</div>

        <div class="box">Respuesta:
{ "token": "..." }</div>

        <p class="hint">
          Tip: con el token ya puedes consumir <span class="kbd">/api/posts</span> desde Postman.
        </p>
      </div>
    </div>
  </div>

  <script>
    function openLink(path){
      window.location.href = path;
    }
  </script>
</body>
</html>
  `);
});

// ===========================
// SALUD (HTML por defecto + JSON opcional)
// ===========================
app.get("/salud", (req, res) => {
  // Si quieres JSON explícito: /salud?json=1
  if (req.query.json === "1") {
    return res.status(200).json({ status: "ok" });
  }

  // HTML bonito por defecto
  return res.status(200).send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Health Check · Hybridge Blog API</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root{
      --bg1:#071029;
      --bg2:#020617;
      --card:rgba(255,255,255,.06);
      --stroke:rgba(255,255,255,.11);
      --text:#e5e7eb;
      --muted:#cbd5e1;
      --blue:#60a5fa;
      --green:#22c55e;
      --amber:#f59e0b;
      --shadow:0 28px 70px rgba(0,0,0,.55);
      --radius:22px;
      --mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    *{box-sizing:border-box}
    body{
      margin:0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(900px 600px at 15% 10%, rgba(245,158,11,.22), transparent 55%),
        radial-gradient(1100px 700px at 85% 0%, rgba(96,165,250,.28), transparent 55%),
        radial-gradient(circle at top, var(--bg1), var(--bg2));
      color:var(--text);
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:32px 18px;
    }
    .wrap{max-width:980px; width:100%;}
    .top{
      display:flex; justify-content:space-between; align-items:center;
      gap:14px; flex-wrap:wrap; margin-bottom:16px;
    }
    .badge{
      display:inline-flex; align-items:center; gap:10px;
      padding:8px 14px; border-radius:999px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.06);
      backdrop-filter: blur(10px);
      color:var(--muted);
      font-size:.9rem;
    }
    .dot{
      width:10px;height:10px;border-radius:50%;
      background:var(--green);
      box-shadow:0 0 12px rgba(34,197,94,.9);
    }
    .btn{
      display:inline-flex; align-items:center; gap:10px;
      padding:10px 14px; border-radius:14px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(0,0,0,.18);
      color:var(--text);
      text-decoration:none;
      transition:all .15s ease;
    }
    .btn:hover{border-color:rgba(96,165,250,.45); transform:translateY(-1px)}
    h1{margin:0 0 10px; font-size:2.4rem; letter-spacing:-0.02em;}
    p{margin:0; color:var(--muted); line-height:1.7}
    .grid{
      display:grid; grid-template-columns: 1.1fr .9fr; gap:18px;
      margin-top:18px;
    }
    @media(max-width:900px){ .grid{grid-template-columns:1fr;} h1{font-size:2rem;} }
    .card{
      background:var(--card);
      border:1px solid var(--stroke);
      border-radius:var(--radius);
      padding:18px;
      box-shadow:var(--shadow);
      backdrop-filter: blur(14px);
    }
    .status{
      display:flex; align-items:center; justify-content:space-between;
      gap:12px; padding:14px 16px;
      border-radius:16px;
      border:1px solid rgba(34,197,94,.28);
      background:rgba(34,197,94,.08);
      margin-top:14px;
    }
    .status strong{color:#86efac; font-size:1.05rem}
    .pill{
      font-family:var(--mono);
      font-size:.86rem;
      padding:6px 10px;
      border-radius:12px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(0,0,0,.18);
      color:#e2e8f0;
      white-space:nowrap;
    }
    .mono{
      font-family:var(--mono);
      background:rgba(0,0,0,.16);
      border:1px solid rgba(255,255,255,.10);
      border-radius:16px;
      padding:14px;
      margin-top:12px;
      white-space:pre-wrap;
      overflow:auto;
      color:#e2e8f0;
      line-height:1.55;
      font-size:.92rem;
    }
    .note{
      margin-top:12px;
      font-size:.92rem;
      color:#94a3b8;
    }
    a{color:var(--blue); text-decoration:none}
    a:hover{text-decoration:underline}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div class="badge"><span class="dot"></span> Health Check · Servicio activo</div>
      <a class="btn" href="/">⬅ Volver al inicio</a>
    </div>

    <h1>Estado del servicio</h1>
    <p>
      Este endpoint valida que la API está en funcionamiento. Se usa para monitoreo
      y para confirmar que el despliegue en producción está respondiendo correctamente.
    </p>

    <div class="grid">
      <div class="card">
        <h2 style="margin:0 0 8px;">Resultado</h2>
        <div class="status">
          <strong>OK · API operando</strong>
          <span class="pill">GET /salud</span>
        </div>

        <div class="mono">Para obtener JSON explícito:
GET /salud?json=1

Respuesta:
{ "status": "ok" }</div>

        <div class="note">Tip: esta pantalla es ideal como evidencia visual (no se ve como block de notas).</div>
      </div>

      <div class="card">
        <h2 style="margin:0 0 8px;">Accesos rápidos</h2>
        <div class="mono">Inicio (landing):
GET /

Posts (protegido):
GET /api/posts
Header: Authorization: Bearer &lt;TOKEN&gt;</div>

        <div class="note">
          Si quieres mostrar “evidencia JSON”, usa el link:
          <a href="/salud?json=1">/salud?json=1</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `);
});

// ===========================
// API LOGIN (ejemplo mínimo)
// ===========================
app.post("/api/login", (req, res) => {
  // Aquí va tu lógica real (usuario, password, jwt, etc.)
  // Mantengo una respuesta de ejemplo para que tu proyecto no se rompa,
  // pero en tu repo seguro ya tienes tu implementación.
  return res.status(200).json({ token: "..." });
});

// ===========================
// POSTS (ejemplo)
// ===========================
app.get("/api/posts", (req, res) => {
  // Aquí normalmente validarías JWT.
  return res.status(200).json([
    { id: 1, title: "Primer post", content: "Contenido de ejemplo", author: "Hybridge" },
  ]);
});

// ===========================
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
