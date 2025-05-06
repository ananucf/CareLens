import { Router } from 'express';
import { createStatHeart, getAllStatHeart, getStatHeart, updateStatHeart } from './heartStat.controller.js';
import { verifyToken } from '../../middleware/verifyToken.js';

const heartStatRouter = Router();

heartStatRouter.post('/', verifyToken, createStatHeart);

heartStatRouter.get('/user/:userId', verifyToken, getAllStatHeart);

heartStatRouter.route('/:id')
  .get(verifyToken, getStatHeart)
  .put(verifyToken, updateStatHeart);

export default heartStatRouter;
