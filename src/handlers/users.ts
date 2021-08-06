import express, { Request, Response } from 'express';
import { UsersManagement, User } from '../models/users';
import jwt from 'jsonwebtoken';

const userStore = new UsersManagement();

// const TOK_SECRET: string = process.env.TOKEN_SECRET || '';

/* 
export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
};
*/
const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        };

        const newUser = await userStore.create(user);
        // var token = jwt.sign({ user: newUser }, TOK_SECRET);
        res.json(newUser);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

// const authenticate = async (req: Request, res: Response) => {
//     const user: User = {
//         username: req.body.username,
//         password_digest: req.body.password,
//     };
//     try {
//         const u = await userStore.authenticate(
//             user.username,
//             user.password_digest
//         );
//         var token = jwt.sign({ user: u }, TOK_SECRET);
//         res.json(token);
//     } catch (error) {
//         res.status(401);
//         res.json({ error });
//     }
// };

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

// const verifyAuthToken = (req: Request, res: Response, next) => {
//     try {
//         const authorizationHeader: string = req.headers.authorization || '';
//         const token = authorizationHeader.split(' ')[1];
//         const decoded: any = jwt.verify(token, TOK_SECRET);

//         next();
//     } catch (error) {
//         res.status(401);
//     }
// };

// const destroy = async (req: Request, res: Response) => {
//     const deleted = await userStore.delete(req.body.id);
//     res.json(deleted);
// };

const userRoute = (app: express.Application) => {
    // app.get('/users', index);
    // app.get('/users/:id', show);
    // app.post('/users', verifyAuthToken, create);
    // app.put('/users/:id', verifyAuthToken, update);
    // app.delete('/users/:id', verifyAuthToken, destroy);

    app.post('/users', create);
    // app.put('/users/:id', update);
};

export default userRoute;
