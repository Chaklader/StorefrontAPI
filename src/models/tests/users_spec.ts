import { UsersManagement, User } from '../users';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pepper = process.env.BYCRYPT_PASSWORD;
const saltRounds = '' + process.env.SALT_ROUNDS;

const userStore = new UsersManagement();

describe('User Model', () => {
    /* 
        check if the methods are defined
    */
    it('should have a create method', () => {
        expect(userStore.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(userStore.update).toBeDefined();
    });

    it('should have a login method', () => {
        expect(userStore.login).toBeDefined();
    });

    it('should have an index method', () => {
        expect(userStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(userStore.show).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(userStore.delete).toBeDefined();
    });

    /* 
        check if the methods are functioning well
    */
    it('create method should add an user', async () => {
        const result: User = await userStore.create({
            firstname: 'natalie',
            lastname: 'portman',
            password: 'init_password',
            role: 'ADMIN',
            email: 'natalie.portman@gmail.com',
        });

        const hashedPassword = result.password;

        const createdUser: User = {
            id: 1,
            firstname: 'natalie',
            lastname: 'portman',
            password: hashedPassword,
            role: 'ADMIN',
            email: 'natalie.portman@gmail.com',
        };

        expect(result).toEqual(createdUser);
    });

    it('update method should update the respective user data', async () => {
        const updatedUser = await userStore.update(
            {
                firstname: 'Chaklader',
                lastname: 'Arefe',
                password: 'password',
                role: 'ADMIN',
                email: 'omi.chaklader@gmail.com',
            },
            1
        );

        const result = await userStore.show(1);
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

    it('login method should return the user', async () => {
        const result = await userStore.login(
            'omi.chaklader@gmail.com',
            'password'
        );

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
        const result = await userStore.index();

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
        const result = await userStore.show(1);

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

    it('delete method should remove the user', async () => {
        userStore.delete(1);
        const result = await userStore.index();

        expect(result).toEqual([]);
    });
});

export default userStore;
