import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { createAnemia, getAnemia, updateAnemia } from "./anemia.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const anemiaRouter = Router();

anemiaRouter.post("/", verifyToken, catchError(createAnemia));

anemiaRouter
  .route("/:patientId")
  .get(verifyToken, catchError(getAnemia))
  .put(verifyToken, catchError(updateAnemia));

export default anemiaRouter;
