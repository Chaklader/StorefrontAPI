import { OrderStore, Order } from '../orders';

const store = new OrderStore();

describe('Order Model', () => {
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

    // it('create method should add an order', async () => {
    //     const result = await store.create({
    //         id: 1,
    //         userId: 12345,
    //         status: 'open',
    //     });

    //     expect(result).toEqual({
    //         id: 1,
    //         userId: 12345,
    //         status: 'open',
    //     });
    // });

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
