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
    const users = await dashboard.fiveMostExpensive();
    res.json(users);
};

const dashboardRoutes = (app: express.Application) => {
    app.get('/products_in_orders', productsInOrders);
    app.get('/users-with-orders', usersWithOrders);
    app.get('/five-most-expensive', fiveMostExpensive);
};

export default dashboardRoutes;
