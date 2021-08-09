import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
    try {
        const products = await dashboard.productsInOrders();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const usersWithOrders = async (_req: Request, res: Response) => {
    try {
        const users = await dashboard.usersWithOrders();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const fiveMostExpensive = async (_req: Request, res: Response) => {
    try {
        const users = await dashboard.fiveMostExpensiveProducts();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const fiveMostPopular = async (_req: Request, res: Response) => {
    try {
        const users = await dashboard.fiveMostPopularProducts();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

/* 
    Show currently open orders by user 
*/
const showCurrentOrders = async (_req: Request, res: Response) => {
    try {
        const userId = parseInt(_req.params.id);

        const orders = await dashboard.showCurrentOrders(userId);
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

/* 
    Show completed orders by user 
*/
const showCompletedOrders = async (_req: Request, res: Response) => {
    try {
        const userId = parseInt(_req.params.id);

        const orders = await dashboard.showCompletedOrders(userId);
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const dashboardRoutes = (app: express.Application) => {
    app.get('/products_in_orders', productsInOrders);
    app.get('/users-with-orders', usersWithOrders);
    app.get('/five-most-expensive', fiveMostExpensive);
    app.get('/five-most-popular', fiveMostPopular);
    app.get('/show-current-orders', showCurrentOrders);
    app.get('/show-completed-orders', showCompletedOrders);
};

export default dashboardRoutes;
