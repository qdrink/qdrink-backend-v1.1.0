import { Router } from "express";
import { list, add, sendQr,get,info,getForConsume,compromise,put } from "../controllers/clients";

const router = Router();

router.post("/compromise/", compromise);
router.get("/info/", info);
router.get("/info/:id", get);
router.put("/:id", put);
router.get("/", list);
router.get("/:id", getForConsume);
router.post("/", add);
router.post("/sendqr", sendQr); 

export default router;
