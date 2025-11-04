// ✅ Importación compatible con CommonJS
import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// ✅ Habilitar CORS globalmente
server.use(
  cors({
    origin: ["http://localhost:4200"], // 🟢 tu Angular local
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);


// ✅ Middleware para parsear JSON
server.use(jsonServer.bodyParser);

// ✅ Agregar tus middlewares por defecto
server.use(middlewares);

// ✅ Prefijo opcional si quieres
// server.use('/api', router);
server.use(router);

// ✅ Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Backend veterinaria corriendo en puerto ${PORT}`);
});
