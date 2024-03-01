import { Router } from "express";
import { Runner } from "../controllers/InfoToRole";

let router = Router();

router.route("/job-role").post(Runner);

export default router;
