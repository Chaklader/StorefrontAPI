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

/* 
    an order can only be created by the respective user after the token validation
*/
const create = async (_req: Request, res: Response) => {
    try {
        const order: Order = {
            userId: _req.body.userId,
            status: _req.body.status,
        };

        /* 
            Noone but the respective user can create their own order
        */
        try {
            const authorizationHeader = _req.headers.authorization + '';
            const token = authorizationHeader.split(' ')[1];

            const decoded: any = jwt.verify(
                token,
                process.env.TOKEN_SECRET + ''
            );

            if (decoded.user.id != order.userId) {
                throw new Error(
                    'Only the respective user can create their own order...'
                );
            }
        } catch (err) {
            res.status(401);
            res.send(
                `Unable to create order due to invalid token with Error: ${err}`
            );
            return;
        }

        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

/* 
    only the respective user will be able to add more products to their order 
    after the token validation...
*/
const addProduct = async (_req: Request, res: Response) => {
    const orderId: number = parseInt(_req.params.orderId);
    const userId: number = parseInt(_req.params.userId);

    const productId: number = _req.body.productId;
    const quantity: number = parseInt(_req.body.quantity);

    /* 
        Noone but the respective user can create their own order
    */
    try {
        const authorizationHeader = _req.headers.authorization + '';
        const token = authorizationHeader.split(' ')[1];

        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET + '');

        if (decoded.user.id != userId) {
            throw new Error(
                'Only the respective user can create their own order...'
            );
        }
    } catch (err) {
        res.status(401);
        res.send(
            `Unable to create order due to invalid token with Error: ${err}`
        );
        return;
    }

    try {
        const addedProduct = await store.addProduct(
            quantity,
            orderId,
            productId
        );

        res.json(addedProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

/* 
    any autheticated user can see all the orders 
*/
const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index();
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (_req: Request, res: Response) => {
    try {
        const orderId = parseInt(_req.params.id);

        const order = await store.show(orderId);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

/* 
    only the respective user can delete their own order
*/
const destroy = async (_req: Request, res: Response) => {
    try {
        const orderId = parseInt(_req.params.id);
        const order = await store.show(orderId);

        /* 
            Noone but the respective user can create their own order
        */
        try {
            const authorizationHeader = _req.headers.authorization + '';
            const token = authorizationHeader.split(' ')[1];

            const decoded: any = jwt.verify(
                token,
                process.env.TOKEN_SECRET + ''
            );

            const uId = JSON.parse(JSON.stringify(order)).user_id;

            if (decoded.user.id != uId) {
                throw new Error(
                    'only the respective user can delete their own order ..'
                );
            }
        } catch (err) {
            res.status(401);
            res.send(
                `Unable to delete order due to invalid token with Error: ${err}`
            );
            return;
        }

        const deleted = await store.delete(orderId);
        res.json(deleted);
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
            `Unable to create order due to invalid token with Error: ${err}`
        );
        return;
    }
};

const orderRoutes = (app: express.Application) => {
    app.post('/orders', create);
    app.post('/users/:userID/orders/:orderID/products', addProduct);
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);

    app.delete('/orders/:id', destroy);
};

export default orderRoutes;
