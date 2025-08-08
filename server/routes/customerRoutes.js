import express from "express";
import * as controller from "../controllers/customerController.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.patch("/:id", controller.updatePartial);

export default router;
