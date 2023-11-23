import { Router } from "express";
import { list, add, sendQr,get,info,getForConsume } from "../controllers/clients";

const router = Router();

router.get("/info/", info);
router.get("/info/:id", get);
router.get("/", list);
router.get("/:id", getForConsume);
router.post("/", add);
router.post("/sendqr", sendQr); 

export default router;
