import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { createDiabetes, getDiabetes, updateDiabetes } from "./diabetes.controller.js";

const diabetesRouter = Router();

diabetesRouter.post("/", verifyToken, catchError(createDiabetes));

diabetesRouter
  .route("/:patientId")
  .get(verifyToken, catchError(getDiabetes))
  .put(verifyToken, catchError(updateDiabetes));

export default diabetesRouter;
