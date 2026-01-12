// Health check con vista visual o JSON según el cliente
app.get("/salud", (req, res) => {
  const accept = req.headers.accept || "";

  // Si el cliente espera JSON (Postman, fetch, axios)
  if (accept.includes("application/json")) {
    return res.json({ status: "ok" });
  }

  // Si es navegador, renderizar HTML
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Health Check | Hybridge API</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      background: radial-gradient(circle at top, #0f172a, #020617);
      color: #e5e7eb;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(14px);
      border-radius: 18px;
      padding: 36px 40px;
      max-width: 520px;
      width: 100%;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(34, 197, 94, 0.15);
      color: #4ade80;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 0.85rem;
      margin-bottom: 18px;
    }

    .dot {
      width: 10px;
      height: 10px;
      background: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 10px #22c55e;
    }

    h1 {
      margin: 0 0 10px;
      font-size: 2rem;
      font-weight: 700;
    }

    p {
      margin: 0 0 22px;
      line-height: 1.6;
      color: #cbd5f5;
    }

    .status {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      padding: 14px 18px;
      border-radius: 12px;
      font-weight: 600;
      color: #4ade80;
      margin-bottom: 24px;
    }

    .footer {
      font-size: 0.85rem;
      color: #94a3b8;
    }

    a {
      color: #60a5fa;
      text-decoration: none;
    }
  </style>
</head>

<body>
  <div class="card">
    <div class="badge">
      <span class="dot"></span>
      Servicio activo
    </div>

    <h1>Health Check</h1>

    <p>
      Este endpoint verifica el estado del servicio en producción.
      Es utilizado por sistemas de monitoreo y despliegue.
    </p>

    <div class="status">
      Estado del servicio: OK
    </div>

    <div class="footer">
      Hybridge Blog API · Producción<br />
      <a href="/">Volver a la página principal</a>
    </div>
  </div>
</body>
</html>
  `);
});
