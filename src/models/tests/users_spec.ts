import { UsersManagement, User } from '../users';

const store = new UsersManagement();

describe('User Model', () => {
    beforeAll(function () {
        console.log('\n');
        console.log('Start to run the tests for the user model');
        console.log('\n');
    });

    afterAll(function () {
        console.log('\n');
        console.log('End of running all the tests for the user model');
        console.log('\n');
    });

    let TEST_USER: User = {} as User;

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

    it('create method should add an user', async () => {
        const createdUser: User = await store.create({
            firstname: 'natalie',
            lastname: 'portman',
            password: 'init_password',
            role: 'ADMIN',
            email: 'natalie.portman@gmail.com',
        });

        TEST_USER = createdUser;

        const expectedUser: User = {
            id: createdUser.id,
            firstname: 'natalie',
            lastname: 'portman',
            password: TEST_USER.password,
            role: 'ADMIN',
            email: 'natalie.portman@gmail.com',
        };

        expect(expectedUser).toEqual(createdUser);
    });

    it('update method should update the respective user data', async () => {
        if (TEST_USER == null || TEST_USER.id == null) {
            throw new Error(
                "The user is not created, so, we can't update their info."
            );
        }

        const updatedUser = await store.update(
            {
                firstname: 'Chaklader',
                lastname: 'Arefe',
                password: 'password',
                role: 'ADMIN',
                email: 'omi.chaklader@gmail.com',
            },
            TEST_USER.id
        );

        TEST_USER = await store.show(TEST_USER.id);

        expect(TEST_USER).toEqual({
            id: TEST_USER.id,
            firstname: 'Chaklader',
            lastname: 'Arefe',
            password: TEST_USER.password,
            role: 'ADMIN',
            email: 'omi.chaklader@gmail.com',
        });
    });

    it('login method should return the user', async () => {
        const loggedinUser = await store.login(
            'omi.chaklader@gmail.com',
            'password'
        );

        if (loggedinUser == null) {
            throw new Error('No user found for the email and password.');
        }

        expect(loggedinUser).toEqual({
            id: loggedinUser.id,
            firstname: 'Chaklader',
            lastname: 'Arefe',
            password: loggedinUser.password,
            role: 'ADMIN',
            email: 'omi.chaklader@gmail.com',
        });
    });

    it('index method should return a list of users', async () => {
        const allUsers = await store.index();

        expect(allUsers).toEqual([
            {
                id: TEST_USER.id,
                firstname: 'Chaklader',
                lastname: 'Arefe',
                password: TEST_USER.password,
                role: 'ADMIN',
                email: 'omi.chaklader@gmail.com',
            },
        ]);
    });

    it('show method should return the correct user', async () => {
        if (TEST_USER == null || TEST_USER.id == null) {
            throw new Error(
                "The user is not created, so, we can't show their their info."
            );
        }
        const userById = await store.show(TEST_USER.id);

        expect(userById).toEqual({
            id: TEST_USER.id,
            firstname: 'Chaklader',
            lastname: 'Arefe',
            password: TEST_USER.password,
            role: 'ADMIN',
            email: 'omi.chaklader@gmail.com',
        });
    });

    it('delete method should remove the user', async () => {
        if (TEST_USER == null || TEST_USER.id == null) {
            throw new Error(
                "The user is not created, so, we can't delete them."
            );
        }

        store.delete(TEST_USER.id);
        const allUsers = await store.index();

        expect(allUsers).toEqual([]);
    });
});
