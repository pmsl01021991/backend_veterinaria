import express from "express";
import cors from "cors";
import { create, router as jsonRouter } from "json-server";

const server = express();
const router = jsonRouter("db.json"); // base de datos local
const middlewares = create();

server.use(cors());
server.use(express.json());
server.use("/api", router);

// 🔹 Puerto asignado por Render o local
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor JSON corriendo en el puerto ${port}`);
});
