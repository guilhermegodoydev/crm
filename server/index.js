import express from "express";
import customerRouter from "./routes/customerRoutes.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/customers", customerRouter);

app.listen(PORT, () => {
  console.log("Servidor rodando");
});
