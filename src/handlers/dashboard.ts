import express, { Request, Response } from 'express';
import {DashboardQueries, ExpensiveProducts, ProductsInOrders, UsersWithOrders} from '../services/dashboard';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {Order} from "../models/orders";
import {Product} from "../models/products";

dotenv.config();

const secretToken = process.env.TOKEN_SECRET + '';

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
    try {
        const products: ProductsInOrders[] = await dashboard.productsInOrders();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const usersWithOrders = async (_req: Request, res: Response) => {
    try {
        const users: UsersWithOrders[] = await dashboard.usersWithOrders();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const fiveMostExpensive = async (_req: Request, res: Response) => {
    try {
        const users: ExpensiveProducts[] = await dashboard.fiveMostExpensiveProducts();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const fiveMostPopular = async (_req: Request, res: Response) => {
    try {
        console.log('--------5 most popular-------');
        const users: Product[] = await dashboard.fiveMostPopularProducts();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

/* 
    Show currently open orders by user after token validation
*/
const showCurrentOrders = async (_req: Request, res: Response) => {
    try {
        const userId = parseInt(_req.params.userId);

        try {
            const authorizationHeader = _req.headers.authorization + '';
            const token = authorizationHeader.split(' ')[1];

            const decoded: any = jwt.verify(
                token,
                secretToken
            );

            if (decoded.user.id != userId) {
                throw new Error(
                    'only the respective user can see their current orders ..'
                );
            }
        } catch (err) {
            res.status(401);
            res.send(
                `Unable to show current orders for user ${userId} due to invalid token with Error: ${err}`
            );

            return;
        }

        const orders: Order[] = await dashboard.showCurrentOrdersForUser(userId);
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};


const showCompletedOrders = async (_req: Request, res: Response) => {
    try {
        const userId = parseInt(_req.params.userId);

        try {
            const authorizationHeader = _req.headers.authorization + '';
            const token = authorizationHeader.split(' ')[1];

            const decoded: any = jwt.verify(
                token,
                secretToken
            );

            if (decoded.user.id != userId) {
                throw new Error(
                    'only the respective user can see their completed orders ..'
                );
            }
        } catch (err) {
            res.status(401);
            res.send(
                `Unable to show completed orders for user ${userId} due to invalid token with Error: ${err}`
            );

            return;
        }

        const orders: Order[] = await dashboard.showCompletedOrdersForUsers(userId);
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const dashboardRoutes = (app: express.Application) => {
    app.get('/products-in-orders', productsInOrders);
    app.get('/users-with-orders', usersWithOrders);
    app.get('/five-most-expensive', fiveMostExpensive);
    app.get('/five-most-popular', fiveMostPopular);
    app.get('/show-current-orders/:userId', showCurrentOrders);
    app.get('/show-completed-orders/:userId', showCompletedOrders);
};

export default dashboardRoutes;
