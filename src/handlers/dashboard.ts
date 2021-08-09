import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
    const products = await dashboard.productsInOrders();
    res.json(products);
};

const usersWithOrders = async (_req: Request, res: Response) => {
    const users = await dashboard.usersWithOrders();
    res.json(users);
};

const fiveMostExpensive = async (_req: Request, res: Response) => {
    const users = await dashboard.fiveMostExpensiveProducts();
    res.json(users);
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
    app.get('/show-current-orders', showCurrentOrders);
    app.get('/show-completed-orders', showCompletedOrders);

};

export default dashboardRoutes;
