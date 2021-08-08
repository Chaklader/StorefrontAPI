import express, { Request, Response } from 'express';
import { UsersManagement, User } from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UsersManagement();

/* 
#### API endpoints
#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

*/

const tokenSecret = process.env.TOKEN_SECRET + '';

const create = async (_req: Request, res: Response) => {
    try {
        const user: User = {
            firstName: _req.body.firstName,
            lastName: _req.body.lastName,
            password: _req.body.password,
        };

        const newUser = await store.create(user);
        var token = jwt.sign({ user: newUser }, tokenSecret);

        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const isUserAuthenticated = async (_req: Request, res: Response) => {
    try {
        const user: User = {
            firstName: _req.body.firstName,
            lastName: _req.body.lastName,
            password: _req.body.password,
        };
        const authenticatedUser = await store.authenticate(
            user.firstName,
            user.lastName,
            user.password
        );

        if (authenticatedUser) {
            return res.json('user is autheticated');
        }

        return res.json(
            '\
        {\
            "isAuthenticated: "true";\
        }\
        '
        );
    } catch (error) {
        res.status(401);
        res.json({ error });
    }
};

const index = async (_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
};

const show = async (_req: Request, res: Response) => {
    const userId = parseInt(_req.params.id);

    const product = await store.show(userId);
    res.json(product);
};


/* 
    Usually, an admin will have the priviledges for the user info update. 
    For simplicity, we will allow update user settting to the user that has
    created it.
*/
const update = async (_req: Request, res: Response) => {
    const user: User = {
        firstName: _req.body.firstName,
        lastName: _req.body.lastName,
        password: _req.body.password
    };
    try {
        const authorizationHeader = _req.headers.authorization + '';
        const token = authorizationHeader.split(' ')[1];

        const decoded: any = jwt.verify(token, tokenSecret);

        if (decoded.id !== user.id) {
            throw new Error('User id does not match!');
        }
    } catch (err) {
        res.status(401);
        res.json(err);
        return;
    }

    try {
        const updated = await store.create(user);
        res.json(updated);
    } catch (err) {
        res.status(400);
        res.json(err + user);
    }
};


const verifyAuthToken = (_req: Request, res: Response, next: any) => {

    const user: User = {
        firstName: _req.body.firstName,
        lastName: _req.body.lastName,
        password: _req.body.password
    };
    try {
        const authorizationHeader = _req.headers.authorization + '';
        const token = authorizationHeader.split(' ')[1];

        const decoded: any = jwt.verify(token, tokenSecret);

        // if (decoded.id !== user.id) {
        //     throw new Error('User id does not match!');
        // }

        next();
    } catch (err) {
        res.status(401);
        res.send(
            `Unable to create product due to invalid token with Error: ${err}`
        );
        return;
    }
};

const destroy = async (_req: Request, res: Response) => {
    const deleted = await store.delete(parseInt(_req.params.id));
    res.json(deleted);
};

const userRoute = (app: express.Application) => {
    app.post('/users', create);
    // app.post('/users/authenticate', isUserAuthenticated);

    app.get('/users', isUserAuthenticated, index);
    app.get('/users/:id', isUserAuthenticated, show);
    app.delete('/users/:id', isUserAuthenticated, destroy);
};

export default userRoute;
