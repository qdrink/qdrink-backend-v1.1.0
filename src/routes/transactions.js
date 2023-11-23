import { Router } from "express";
import { add, info,getbyClient } from "../controllers/transactions.js";

const router = Router();

router.post("/", add);
router.get("/info/", info);
router.get("/:id/info", getbyClient);


export default router;
