import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { createHeart, getHeart, updateHeart } from "./heart.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const heartRouter = Router();

heartRouter.post("/", verifyToken, catchError(createHeart));

heartRouter
  .route("/:patientId")
  .get(verifyToken, catchError(getHeart))
  .put(verifyToken, catchError(updateHeart));

export default heartRouter;
