import express, { Request, Response } from 'express';
import { ProductStore, Product } from '../models/products';

const store = new ProductStore();

/* 
export type Product = {
    id?: number;
    name: string;
    price: number;
    category?: string;
};
*/

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
};

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.body.id);
    res.json(product);
};

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        };

        const newProduct = await store.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    let productId = req.body.id;
    const deleted = await store.delete(productId);
    res.json(deleted);
};

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    app.delete('/products', destroy);
};

export default productRoutes;
