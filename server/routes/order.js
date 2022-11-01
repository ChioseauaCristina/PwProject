import express from "express";
import { createOrder, getOrders } from "../controllers/order.js";

const router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);

export default router;