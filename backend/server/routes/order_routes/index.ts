import { Order } from "@prisma/client";
import { orderDb } from "../../../prisma/db/order";
import express from "express";
import authorization from "../../middleware/authorization";

export const orderRouter = express.Router();

orderRouter.get('/orders', authorization, async (req, res) => {
    const allOrders = await orderDb.getAllOrders();

    res.statusCode = 200;
    res.send(allOrders);
});

orderRouter.get('/orders/:id', async (req, res) => {
    const order = await orderDb.getOrderById(Number(req.params.id));

    if (order) {
        res.statusCode = 200;
        res.send(order);
    } else {
        res.statusCode = 404;
        res.send(`Cannot found the Order ID: ${req.params.id}`);
    }
});

orderRouter.post('/orders/create', async (req, res) => {
    const createdOrder:Order = await orderDb.createOrder(req.body);

    res.statusCode = 201;
    res.send(createdOrder);
});

orderRouter.delete('/orders/delete/:id', async (req, res) => {
    const deletedOrder = await orderDb.deleteOrder(Number(req.params.id));

    res.statusCode = 200;
    res.send(deletedOrder);
});

orderRouter.put('/orders/:id', async (req, res) => {
    const updatedOrder = await orderDb.updateOrderStatus(req.body);

    res.statusCode = 200;
    res.send(updatedOrder);
});