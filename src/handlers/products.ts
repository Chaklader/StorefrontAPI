import express, { Request, Response } from 'express';
import { ProductStore, Product } from '../models/products';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new ProductStore();

/* 
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)
*/
const create = async (_req: Request, res: Response) => {
    try {
        const product: Product = {
            name: _req.body.name,
            price: _req.body.price,
            category: _req.body.category,
        };

        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (_req: Request, res: Response) => {
    try {
        const productId = parseInt(_req.params.id);

        const product = await store.show(productId);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (_req: Request, res: Response) => {
    try {
        const productId = parseInt(_req.params.id);

        const delProduct = await store.delete(productId);
        res.json(`deleted the product with Id ${productId}`);
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

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.delete('/products/:id', destroy);
};

export default productRoutes;
