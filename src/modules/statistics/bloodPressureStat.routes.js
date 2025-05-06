import { Router } from 'express';
import { createStatPressure, getAllStatPressure, getStatPressure, updateStatPressure } from './bloodPressureStat.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';


const pressureStatRouter = Router();

// Add new pressure entry
pressureStatRouter.post('/',verifyToken,  createStatPressure);

// Get all pressure entries for a user
pressureStatRouter.get('/user/:userId',verifyToken,  getAllStatPressure);

// Get, update, delete a specific entry
pressureStatRouter.route('/:id')
  .get(verifyToken, getStatPressure)
  .put(verifyToken, updateStatPressure)

export default pressureStatRouter;