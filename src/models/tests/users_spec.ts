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
    it('create method should add an user', async () => {
        const result: User = await store.create({
            firstname: 'Chaklader',
            lastname: 'Arefe',
            password: 'password',
            role: 'ADMIN',
            email: 'omi.chaklader@gmail.com',
        });

        const hashedPassword = result.password;

        const createdUser: User = {
            id: 1,
            firstname: 'Chaklader',
            lastname: 'Arefe',
            password: hashedPassword,
            role: 'ADMIN',
            email: 'omi.chaklader@gmail.com',
        };

        expect(result).toEqual(createdUser);
    });

    it('login method should return the user', async () => {
        const result = await store.login('omi.chaklader@gmail.com', 'password');

        if (result === null) {
            throw new Error('No user found for the email and password.');
        }

        const hashedPassword = result.password;

        expect(result).toEqual({
            id: 1,
            firstname: 'Chaklader',
            lastname: 'Arefe',
            password: hashedPassword,
            role: 'ADMIN',
            email: 'omi.chaklader@gmail.com',
        });
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();

        const hashedPassword = result[0].password;

        expect(result).toEqual([
            {
                id: 1,
                firstname: 'Chaklader',
                lastname: 'Arefe',
                password: hashedPassword,
                role: 'ADMIN',
                email: 'omi.chaklader@gmail.com',
            },
        ]);
    });

    it('show method should return the correct user', async () => {
        const result = await store.show(1);

        const hashedPassword = result.password;

        expect(result).toEqual({
            id: 1,
            firstname: 'Chaklader',
            lastname: 'Arefe',
            password: hashedPassword,
            role: 'ADMIN',
            email: 'omi.chaklader@gmail.com',
        });
    });

    // it('update method should update the respective user data', async () => {
    //     store.update(
    //         {
    //             firstname: 'natalie',
    //             lastname: 'portman',
    //             password: 'password_renewed',
    //             role: 'ADMIN',
    //             email: 'natalie.portman@gmail.com',
    //         },
    //         1
    //     );

    //     const result = await store.show(1);
    //     const hashedPassword = result.password;

    //     expect(result).toEqual({
    //         id: 1,
    //         firstname: 'natalie',
    //         lastname: 'portman',
    //         password: hashedPassword,
    //         role: 'ADMIN',
    //         email: 'natalie.portman@gmail.com',
    //     });
    // });

    it('delete method should remove the user', async () => {
        store.delete(1);
        const result = await store.index();

        expect(result).toEqual([]);
    });
});
