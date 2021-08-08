import express, { Request, Response } from 'express';
import { OrderStore, Order } from '../models/orders';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const store = new OrderStore();

/* 
#### API endpoints
#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

*/
const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const show = async (_req: Request, res: Response) => {
    const orderId = parseInt(_req.params.id);

    const order = await store.show(orderId);
    res.json(order);
};

const create = async (_req: Request, res: Response) => {
    try {
        const order: Order = {
            productId: _req.body.productId,
            quantity: _req.body.quantity,
            userId: _req.body.userId,
            status: _req.body.status,
        };

        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (_req: Request, res: Response) => {
    const orderId = parseInt(_req.params.id);

    const deleted = await store.delete(orderId);
    res.json(deleted);
};

const addProduct = async (_req: Request, res: Response) => {
    try {
        const quantity = parseInt(_req.body.quantity);
        const productId = _req.body.productId;
        const orderId = _req.body.orderId;

        const newOrderToOrderProductsTable = await store.addOrder(
            quantity,
            orderId,
            productId
        );
        res.json(newOrderToOrderProductsTable);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const verifyAuthToken = (_req: Request, res: Response, next: any) => {
    try {
        const authorizationHeader = _req.headers.authorization + '';
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET + '');

        next();
    } catch (err) {
        res.status(401);
        res.send(
            `Unable to create product due to invalid token with Error: ${err}`
        );
        return;
    }
};

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.post('/orders/:id/products', addProduct);
    app.delete('/orders/:id', destroy);
};

export default orderRoutes;
