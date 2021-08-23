import { UsersManagement, User } from '../users';

const store = new UsersManagement();

describe('User Model', () => {
    let testUser: User = {} as User;

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
            firstname: 'natalie',
            lastname: 'portman',
            password: 'init_password',
            role: 'ADMIN',
            email: 'natalie.portman@gmail.com',
        });

        testUser = result;
        const hashedPassword = result.password;

        const createdUser: User = {
            id: result.id,
            firstname: 'natalie',
            lastname: 'portman',
            password: hashedPassword,
            role: 'ADMIN',
            email: 'natalie.portman@gmail.com',
        };

        expect(result).toEqual(createdUser);
    });

    it('update method should update the respective user data', async () => {
        const updatedUser = await store.update(
            {
                firstname: 'Chaklader',
                lastname: 'Arefe',
                password: 'password',
                role: 'ADMIN',
                email: 'omi.chaklader@gmail.com',
            },
            2
        );

        let hashedPassword;
        let result;

        if (testUser.id) {
            result = await store.show(2);
            hashedPassword = result.password;
        }

        if (hashedPassword) {
            expect(result).toEqual({
                id: 2,
                firstname: 'Chaklader',
                lastname: 'Arefe',
                password: hashedPassword,
                role: 'ADMIN',
                email: 'omi.chaklader@gmail.com',
            });
        }
    });

    it('login method should return the user', async () => {
        const result = await store.login('omi.chaklader@gmail.com', 'password');

        if (result === null) {
            throw new Error('No user found for the email and password.');
        }

        const hashedPassword = result.password;

        expect(result).toEqual({
            id: result.id,
            firstname: 'Chaklader',
            lastname: 'Arefe',
            password: hashedPassword,
            role: 'ADMIN',
            email: 'omi.chaklader@gmail.com',
        });
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();


        expect(result[0].id).toEqual(2);
        // expect(result[0].password).toEqual(testUser.password);
        expect(result[0].firstname).toEqual('Chaklader');
        expect(result[0].lastname).toEqual('Arefe');
        expect(result[0].role).toEqual('ADMIN');
        expect(result[0].email).toEqual('omi.chaklader@gmail.com');
    });

    it('show method should return the correct user', async () => {
        if (testUser.id) {
            const result = await store.show(testUser.id);

            const hashedPassword = result.password;

            expect(result).toEqual({
                id: testUser.id,
                firstname: 'Chaklader',
                lastname: 'Arefe',
                password: hashedPassword,
                role: 'ADMIN',
                email: 'omi.chaklader@gmail.com',
            });
        }
    });

    it('delete method should remove the user', async () => {
        if (testUser.id) {
            store.delete(testUser.id);
        }
        const result = await store.index();

        expect(result.length).toEqual(0);
    });
});
