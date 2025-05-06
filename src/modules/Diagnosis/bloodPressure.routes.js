import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { createPressure, getPressure, updatePressure } from "./bloodPressure.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const pressureRouter = Router();

pressureRouter.post("/", verifyToken, catchError(createPressure));

pressureRouter
  .route("/:patientId")
  .get(verifyToken, catchError(getPressure))
  .put(verifyToken, catchError(updatePressure));

export default pressureRouter;
