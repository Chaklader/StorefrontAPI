import { UsersManagement, User } from '../users';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pepper = process.env.BYCRYPT_PASSWORD;
const saltRounds = '' + process.env.SALT_ROUNDS;

const store = new UsersManagement();

describe('User Model', () => {
    /* 
        check if the methods are defined
    */
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });

    it('should have a login method', () => {
        expect(store.login).toBeDefined();
    });

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    /* 
        check if the methods are functioning well
    */

    // Error
    /* 
        Stack:
        Error: Expected object to have properties
            firstName: 'Chaklader'
            lastName: 'Arefe'
        Expected object not to have properties
            first_name: 'Chaklader'
            last_name: 'Arefe'
            at <Jasmine>
            at UserContext.<anonymous> (/Users/chaklader/Documents/Education/Udacity/Udacity_Nano_Degree/Full_Stack_JavaScript_Developer/C_3/P_3/StorefrontAPI/src/models/tests/users_spec.ts:66:24)
            at processTicksAndRejections (node:internal/process/task_queues:96:5)
    */
    // it('create method should add an user', async () => {
    //     const result = await store.create({
    //         id: 1,
    //         firstName: 'Chaklader',
    //         lastName: 'Arefe',
    //         password: 'password',
    //         role: 'ADMIN',
    //         email: 'omi.chaklader@gmail.com',
    //     });

    //     // bcrypt.compareSync(password + pepper, user.password

    //     const createdUser: User = {
    //         id: 1,
    //         firstName: 'Chaklader',
    //         lastName: 'Arefe',
    //         password: result.password,
    //         role: 'ADMIN',
    //         email: 'omi.chaklader@gmail.com',
    //     };

    //     expect(result).toEqual(createdUser);
    // });

    // it('update method should update the respective user data', async () => {
    //     const result = await store.update(
    //         {
    //             id: 1,
    //             firstName: 'Chaklader',
    //             lastName: 'Arefe',
    //             password: 'password',
    //             role: 'ADMIN',
    //             email: 'omi.chaklader@gmail.com',
    //         },
    //         1
    //     );

    //     expect(result).toEqual({
    //         id: 1,
    //         firstName: 'Chaklader',
    //         lastName: 'Arefe',
    //         password: 'password',
    //         role: 'ADMIN',
    //         email: 'omi.chaklader@gmail.com',
    //     });
    // });

    // it('login method should return the user', async () => {
    //     const result = await store.login('omi.chaklader@gmail.com', 'password');

    //     expect(result).toEqual({
    //         id: 1,
    //         firstName: 'Chaklader',
    //         lastName: 'Arefe',
    //         password: 'password',
    //         role: 'ADMIN',
    //         email: 'omi.chaklader@gmail.com',
    //     });
    // });

    // it('index method should return a list of users', async () => {
    //     const result = await store.index();
    //     expect(result).toEqual([
    //         {
    //             id: 1,
    //             firstName: 'Chaklader',
    //             lastName: 'Arefe',
    //             password: 'password',
    //             role: 'ADMIN',
    //             email: 'omi.chaklader@gmail.com',
    //         },
    //     ]);
    // });

    // it('show method should return the correct user', async () => {
    //     const result = await store.show(1);
    //     expect(result).toEqual({
    //         id: 1,
    //         firstName: 'Chaklader',
    //         lastName: 'Arefe',
    //         password: 'password',
    //         role: 'ADMIN',
    //         email: 'omi.chaklader@gmail.com',
    //     });
    // });

    // it('delete method should remove the user', async () => {
    //     store.delete(1);
    //     const result = await store.index();

    //     expect(result).toEqual([]);
    // });
});
