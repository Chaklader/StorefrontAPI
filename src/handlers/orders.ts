import express, {Request, Response} from 'express';
import {OrderStore, Order} from '../models/orders';
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

const secretToken = process.env.TOKEN_SECRET + '';

const create = async (_req: Request, res: Response) => {
    try {

        const {userId, status} = _req.body;

        const order: Order = {
            userId,
            status,
        };

        try {
            const authorizationHeader = _req.headers.authorization + '';
            const token = authorizationHeader.split(' ')[1];

            const decoded: any = jwt.verify(
                token,
                secretToken
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
    only the respective user will be able to add more products to their order after the token validation. 
    We will add the products to an order is the status is open. For the same order and the products user 
    can chnage their quantity and update the order. The data will be stored in the table named 'order_products'. 

    The POST request will have an URL with user ID and order ID and an example will be:

        http://localhost:3000/users/4/orders/4/products


    The payload example can be:

        {
            "quantity": "700",
            "productId":"1"
        }

    The response example can be:
        
        {
            "id": 1,
            "quantity": 1000,
            "order_id": "1",
            "product_id": "1"
        }
*/
const addProduct = async (_req: Request, res: Response) => {

    const orderId: number = parseInt(_req.params.orderId);
    const userId: number = parseInt(_req.params.userId);

    const productId: number = _req.body.productId;
    const quantity: number = parseInt(_req.body.quantity);

    try {
        const authorizationHeader = _req.headers.authorization + '';
        const token = authorizationHeader.split(' ')[1];

        const decoded: any = jwt.verify(token, secretToken);

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
        const orderProduct = await store.addProduct(
            quantity,
            orderId,
            productId,
            userId
        );

        res.json(orderProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};


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

const destroy = async (_req: Request, res: Response) => {
    try {
        const orderId = parseInt(_req.params.id);
        const order = await store.show(orderId);

        try {
            const authorizationHeader = _req.headers.authorization + '';
            const token = authorizationHeader.split(' ')[1];

            const decoded: any = jwt.verify(
                token,
                secretToken
            );

            const userId = JSON.parse(JSON.stringify(order)).user_id;

            if (decoded.user.id != userId) {
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
        const decoded = jwt.verify(token, secretToken);

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
    app.post('/users/:userId/orders/:orderId/products', addProduct);
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);

    app.delete('/orders/:id', destroy);
};

export default orderRoutes;
