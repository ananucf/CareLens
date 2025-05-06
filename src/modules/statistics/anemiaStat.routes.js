import { Router } from 'express';
import { createStatAnemia, getAllStatAnemia, getStatAnemia, updateStatAnemia } from './anemiaStat.controller.js';
import { verifyToken } from "../../middleware/verifyToken.js";

const anemiaStatRouter = Router();

// Add new anemia entry (multiple allowed)
anemiaStatRouter.post('/', verifyToken, createStatAnemia);

// Get all anemia entries for a specific patient
anemiaStatRouter.get('/user/:userId', verifyToken, getAllStatAnemia);

// Get, update, or delete a specific entry by record ID
anemiaStatRouter.route('/:recordId')
  .get(verifyToken, getStatAnemia)
  .put(verifyToken, updateStatAnemia);


export default anemiaStatRouter;
