import express, { Request, Response } from 'express';
import { OrderStore, Order } from '../models/orders';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const show = async (req: Request, res: Response) => {
    const order = await store.show(req.body.id);
    res.json(order);
};

/* 
export type Order = {
    id?: number;
    productId: string;
    quantity: number;
    userId: string;
    status: string;
};
*/
const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            productId: req.body.productId,
            quantity: req.body.quantity,
            userId: req.body.userId,
            status: req.body.status,
        };

        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id);
    res.json(deleted);
};

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.delete('/orders', destroy);
};

export default orderRoutes;
