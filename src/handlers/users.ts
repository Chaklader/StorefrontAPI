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

const tokenSecret = process.env.TOKEN_SECRET+'';

const index = async (_req: Request, res: Response) => {
    const users = await store.index();
    res.json(users);
};

const show = async (_req: Request, res: Response) => {
    const userId = parseInt(_req.params.id);

    const product = await store.show(userId);
    res.json(product);
};

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        };

        const newUser = await store.create(user);
        var token = jwt.sign({ user: newUser }, tokenSecret);

        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const authenticate = async (_req: Request, res: Response) => {
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

        return res.json('user is not autheticated....');
    } catch (error) {
        res.status(401);
        res.json({ error });
    }
};

// const update = async (req: Request, res: Response) => {
//     // create the user
//     const user: User = {
//         id: parseInt(req.params.id),
//         username: req.body.username,
//         password_digest: req.body.password,
//     };
//     try {
//         const authorizationHeader: string = req.headers.authorization || '';
//         const token = authorizationHeader.split(' ')[1];
//         const decoded: any = jwt.verify(token, TOK_SECRET);

//         if (decoded.id !== user.id) {
//             throw new Error('User id does not match!');
//         }
//     } catch (err) {
//         res.status(401);
//         res.json(err);
//         return;
//     }

//     try {
//         const updated = await userStore.create(user);
//         res.json(updated);
//     } catch (err) {
//         res.status(400);
//         res.json(err + user);
//     }
// };

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

const destroy = async (_req: Request, res: Response) => {
    const deleted = await store.delete(parseInt(_req.params.id));
    res.json(deleted);
};

const userRoute = (app: express.Application) => {
    // app.post('/users', verifyAuthToken, create);
    // app.put('/users/:id', verifyAuthToken, update);
    // app.delete('/users/:id', verifyAuthToken, destroy);
    // app.put('/users/:id', update);

    app.post('/users', create);
    app.post('/users/authenticate', authenticate);

    app.get('/users', index);
    app.get('/users/:id', show);
    app.delete('/users/:id', destroy);
};

export default userRoute;
