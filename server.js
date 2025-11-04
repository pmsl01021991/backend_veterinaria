import express from "express";
import cors from "cors";
import pkg from "json-server"; // compatibilidad con CommonJS
import path from "path";
import { fileURLToPath } from "url";

const { router: jsonRouter, defaults } = pkg;

// Para obtener ruta absoluta del archivo db.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.join(__dirname, "db.json");

const server = express();
const middlewares = defaults();

// ✅ CORS CONFIG COMPLETA
server.use(
  cors({
    origin: ["http://localhost:4200", "https://tu-dominio-frontend.onrender.com"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

server.use(express.json());
server.use(middlewares);
server.use("/usuarios", jsonRouter(dbFile)); // o /api si así usas en frontend

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Servidor backend veterinaria en puerto ${PORT}`);
});
