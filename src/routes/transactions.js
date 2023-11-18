import { Router } from "express";
import { add } from "../controllers/transactions.js";

const router = Router();

router.post("/", add);

export default router;
