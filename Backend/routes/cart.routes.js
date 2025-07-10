import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { createCheckoutSession, getCart, editCart, getStripeSession } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/checkout', verifyToken, createCheckoutSession);
router.get('/', verifyToken, getCart);
router.put('/', verifyToken, editCart);
router.get('/stripe/session/:id', getStripeSession);



export default router;
