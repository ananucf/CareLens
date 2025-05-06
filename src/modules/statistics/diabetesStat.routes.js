import { Router } from 'express';
import { createStatDiabetes, getAllStatDiabetes, getStatDiabetes, updateStatDiabetes } from './diabetesStat.controller.js';
import { verifyToken } from "../../middleware/verifyToken.js";


const diabetesStatRouter = Router();

// Add new diabetes entry
diabetesStatRouter.post('/', verifyToken, createStatDiabetes);

// Get all diabetes entries for a user
diabetesStatRouter.get('/user/:userId', verifyToken, getAllStatDiabetes);

// Get, update specific entry
diabetesStatRouter.route('/:id')
  .get(verifyToken, getStatDiabetes)
  .put(verifyToken, updateStatDiabetes);

export default diabetesStatRouter;
