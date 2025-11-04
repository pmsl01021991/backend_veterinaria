import express from "express";
import cors from "cors";
import pkg from "json-server";  // ✅ Importación compatible con CommonJS
const { router, defaults } = pkg;

const server = express();
const middlewares = defaults();

server.use(cors());
server.use(express.json());
server.use(middlewares);
server.use("/api", router("db.json"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ JSON Server funcionando en Render en el puerto ${PORT}`);
});
