import express, { Request, Response } from 'express';
import { ProductStore, Product } from '../models/products';

const store = new ProductStore();


/* 
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)
*/
const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
};

const show = async (_req: Request, res: Response) => {
    
    const productId = parseInt(_req.params.id);

    const product = await store.show(productId);
    res.json(product);
};

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

const destroy = async (_req: Request, res: Response) => {
    const productId = parseInt(_req.params.id);
    
    const delProduct = await store.delete(productId);
    res.json(`deleted the product with Id ${productId}`);
};

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    app.delete('/products/:id', destroy);
};

export default productRoutes;
