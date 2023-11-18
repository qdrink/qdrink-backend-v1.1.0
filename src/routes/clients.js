import { Router } from "express";
import { list, add, sendQr,getForConsume } from "../controllers/clients";

const router = Router();

router.get("/", list);
router.get("/:id", getForConsume);
router.post("/", add);
router.post("/sendqr", sendQr);

export default router;
