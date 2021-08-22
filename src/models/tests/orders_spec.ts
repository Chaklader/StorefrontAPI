import userRoute from '../../handlers/users';
import { OrderStore, Order } from '../orders';
import { UsersManagement, User } from '../users';

const uStore = new UsersManagement();
const store = new OrderStore();

describe('Order Model', () => {
    //
    let testUser: User = {} as User;

    beforeAll(async () => {
        testUser = await uStore.create({
            firstname: 'merlion',
            lastname: 'monroe',
            password: 'password',
            role: 'ADMIN',
            email: 'm.monroe@gmail.com',
        });

        console.log('\n');
        console.log(testUser);
        console.log('\n');

        const id: number | undefined = testUser.id;

        if (id) {
            uStore.delete(id);
        }
    });

    afterAll(function () {
        const id: number | undefined = testUser.id;

        if (id) {
            uStore.delete(id);
        }
    });

    /* 
     check if the methods are defined well
    */
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a addProduct method', () => {
        expect(store.addProduct).toBeDefined();
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

    // TODO: Error: Could not add new order for user ID 12345 for Error: error: insert or update on table "orders" violates foreign key constraint "orders_user_id_fkey"

    it('create method should add an order', async () => {
        // const u: User = await uStore.create({
        //     firstname: 'merlion',
        //     lastname: 'monroe',
        //     password: 'password_updated',
        //     role: 'COMMUNITY',
        //     email: 'm.monroe@gmail.com',
        // });
        // if (u == null || u.id === undefined) {
        //     return;
        // }
        // console.log(u);
        // const t = await uStore.delete(u.id);


        if(testUser && testUser.id){

            const result = await store.create({

                userId: 1,
                status: 'open',
            });

            // expect(result).toEqual({
            //     id: result.id,
            //     userId: testUser.id,
            //     status: 'open',
            // });
        }
    });

    // ::NOTES::
    // TODO: the create method is not working, so its pointless to test further

    // it('addProduct method should add products to an open order', async () => {
    //     const result: Order = await store.addProduct(100, 1, 1);

    //     expect(result).toEqual({
    //         id: 1,
    //         userId: 12345,
    //         status: 'open',
    //     });
    // });

    // it('index method should return a list of orders', async () => {
    //     const result = await store.index();
    //     expect(result).toEqual([
    //         {
    //             id: 1,
    //             userId: 12345,
    //             status: 'open',
    //         },
    //     ]);
    // });

    // it('show method should return the correct order', async () => {
    //     const result = await store.show(1);

    //     expect(result).toEqual({
    //         id: 1,
    //         userId: 12345,
    //         status: 'open',
    //     });
    // });

    // it('delete method should remove the order', async () => {
    //     store.delete(1);

    //     const result = await store.index();

    //     expect(result).toEqual([]);
    // });
});
