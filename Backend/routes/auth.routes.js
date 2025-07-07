import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { getProfile } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { deleteUser } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, getProfile);
router.delete('/:id', deleteUser);

export default router;
