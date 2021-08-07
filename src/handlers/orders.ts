import express, { Request, Response } from 'express';
import { OrderStore, Order } from '../models/orders';

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

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.delete('/orders/:id', destroy);
};

export default orderRoutes;
