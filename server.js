// ✅ Importación compatible con CommonJS
import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// ✅ Habilitar CORS globalmente
server.use(
  cors({
    origin: [
      "http://localhost:4200", // 🟢 tu Angular local
      "https://veterinaria-interfaces-3.onrender.com" // 🟣 tu frontend en Render
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Middleware para parsear JSON
server.use(jsonServer.bodyParser);

// ✅ Middleware para generar IDs secuenciales solo en mascotas
server.post("/mascotas", (req, res, next) => {
  const db = router.db; // acceso a la base db.json
  const mascotas = db.get("mascotas").value();

  // si hay registros, sumamos 1 al último ID; si no, empezamos en 1
  const nuevoId = mascotas.length > 0 ? mascotas[mascotas.length - 1].id + 1 : 1;

  req.body.id = nuevoId;
  next(); // continuar al manejador de json-server
});

// ✅ Middlewares por defecto
server.use(middlewares);

// ✅ Rutas de la API
server.use(router);

// ✅ Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Backend veterinaria corriendo en puerto ${PORT}`);
});
