import express, {Request, Response} from 'express';
import {ProductStore, Product} from '../models/products';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET + '';

const productStore = new ProductStore();

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
        const {name, price, category} = _req.body;
        const product: Product = {
            name,
            price,
            category,
        };

        const newProduct = await productStore.create(product);

        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const index = async (_req: Request, res: Response) => {
    try {
        const products = await productStore.index();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (_req: Request, res: Response) => {
    try {
        const productId = parseInt(_req.params.id);
        const product = await productStore.show(productId);

        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};


const productsByCategory = async (_req: Request, res: Response) => {
    try {
        const category = _req.params.category;
        const products = await productStore.productsByCategory(category);

        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const destroy = async (_req: Request, res: Response) => {
    try {
        const authorizationHeader = _req.headers.authorization + '';
        const token = authorizationHeader.split(' ')[1];

        const decoded: any = jwt.verify(token, tokenSecret);

        if (!['ADMIN', 'admin'].includes(decoded.role)) {
            throw new Error('Sorry, only an admin can delete a product.');
        }
    } catch (err) {
        res.status(401);
        res.send(
            `Unable to delete product due to invalid token with Error: ${err}`
        );
        return;
    }

    try {
        const productId = parseInt(_req.params.id);

        const delProduct = await productStore.delete(productId);
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
        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET + '');

        console.log(decoded);

        const userRole = decoded.user.role;

        if (userRole != 'ADMIN') {
            throw new Error('Only an admin can create a product...');
        }

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
    app.post('/products', verifyAuthToken, create);
    app.get('/products', index);
    app.get('/products/:id', show);
    app.get('/products/category/:category', productsByCategory);
    app.delete('/products/:id', destroy);
};

export default productRoutes;
