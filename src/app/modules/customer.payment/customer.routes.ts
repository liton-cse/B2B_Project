import express from "express";

import { CustomerController } from "./customer.controller";
import { OrderController } from "../order/order.controller";


const router = express.Router();
router.get("/callback", CustomerController.qbCallback);
router.post("/create-order", OrderController.createOrder);
router.post("/complete-payment", OrderController.completePayment);
router.post("/credit-limit", CustomerController.setCreditLimit);

export default router;
