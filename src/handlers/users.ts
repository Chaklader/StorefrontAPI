import express, { Request, Response } from 'express';
import { UsersOperations, User } from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UsersOperations();

/* 
#### API endpoints
#### Users
- Index [token required]
- Show [token required]
- Create N[token required]
*/
const tokenSecret = process.env.TOKEN_SECRET + '';

/* 
    create a user with first and last name, password, role and email
*/
const create = async (_req: Request, res: Response) => {
    try {
        const { firstname, lastname, password, role, email } = _req.body;

        const user: User = {
            firstname,
            lastname,
            password,
            role,
            email,
        };

        const newUser = await store.create(user);
        var token = jwt.sign({ user: newUser }, tokenSecret);

        return res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

/* 
    we will find the user based on provided email and then will match with the hased password.
    If we see a match, we will decide that this is correct login and will provide JWT token
    than can use used for prividelged operations.
*/
const login = async (_req: Request, res: Response) => {
    try {
        const email = _req.body.email;
        const password = _req.body.password;

        const isRegistered: User | null = await store.login(email, password);

        if (isRegistered) {
            var token = jwt.sign({ user: isRegistered }, tokenSecret);
            res.json(token);

            return;
        }

        return res.json(
            "We don't find an user with the email provided. Please, sign up to the store ..."
        );
    } catch (error) {
        res.status(401);
        res.json({ error });
    }
};

/* 
    We will need token to see all the users,but, doesn't require 'ADMIN' priviledges.
    So, generally any use can see/ find all the users in the app
*/
const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

/* 
    we will need token to see user by ID,but, doesn't require 'ADMIN' priviledges
*/
const show = async (_req: Request, res: Response) => {
    try {
        const userId = parseInt(_req.params.id);

        const product = await store.show(userId);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

/* 
    only an admin can delete a user
*/
const destroy = async (_req: Request, res: Response) => {
    try {
        const authorizationHeader = _req.headers.authorization + '';
        const token = authorizationHeader.split(' ')[1];

        const decoded: any = jwt.verify(token, tokenSecret);
        const userRole = decoded.user.role;

        if (userRole != 'ADMIN') {
            res.status(401).send('Sorry, only an admin can delete an user!');
            return;
        }
    } catch (err) {
        res.status(401);
        res.send(
            `Unable to delete user due to invalid token with Error: ${err}`
        );
        return;
    }

    try {
        const userId = parseInt(_req.params.id);
        const deleted = await store.delete(userId);

        res.json(deleted);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

/* 
    only the respective user can edit their own settings
*/
const update = async (_req: Request, res: Response) => {

    const { firstname, lastname, password, role, email } = _req.body;

    const user: User = {
        firstname,
        lastname,
        password,
        role,
        email,
    };

    try {
        const authorizationHeader = _req.headers.authorization + '';
        const token = authorizationHeader.split(' ')[1];

        const decoded: any = jwt.verify(token, tokenSecret);

        if (decoded.user.id != _req.params.id) {
            res.status(401).send("Sorry, you can't change anyone else settings. Goodbye!!!");
        }
    } catch (err) {
        res.status(401);
        res.json(`Unable to update an user with error ${err}`);

        return;
    }

    try {
        const updatedUser = await store.update(user, parseInt(_req.params.id));
        res.json(updatedUser);
    } catch (err) {
        res.status(400);
        res.json(err + user);
    }
};

const verifyToken = (_req: Request, res: Response, next: any) => {
    try {
        const authorizationHeader = _req.headers.authorization + '';
        const token = authorizationHeader.split(' ')[1];

        const decoded: any = jwt.verify(token, tokenSecret);
        next();
    } catch (err) {
        res.status(401);
        res.send(
            `Unable to create product due to invalid token with Error: ${err}`
        );
        return;
    }
};

const userRoute = (app: express.Application) => {
    app.post('/users/signup', create);
    app.post('/users/login', login);

    app.get('/users', verifyToken, index);
    app.get('/users/:id', verifyToken, show);
    app.put('/users/:id', update);
    app.delete('/users/:id', destroy);
};

export default userRoute;
