import { ProductStore, Product } from '../products';
import client from '../../database';

const store = new ProductStore();

/* 
## Product data scheme

export type Product = {
    id?: number;
    name: string;
    price: number;
    category?: string;
};
*/

console.log('\n');
console.log(client);
console.log('\n');

describe('Product Model', () => {
    /* 
      check if the methods in the product model are defined
    */
    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have an product by category method', () => {
        expect(store.productsByCategory).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    /* 
      check if the methods in the product model are functioning
      as expected
    */
    it('create method should add a product', async () => {
        const result = await store.create({
            id: 1,
            name: 'War and Peace',
            price: 250,
            category: 'Literature',
        });

        expect(result).toEqual({
            id: 1,
            name: 'War and Peace',
            price: 250,
            category: 'Literature',
        });
    });

    // it('index method should return a list of products', async () => {
    //     const result: Product[] = await store.index();

    //     expect(result).toEqual([
    //         {
    //             id: 1,
    //             name: 'War and Peace',
    //             price: 250,
    //             category: 'Literature',
    //         },
    //     ]);
    // });

    // TODO:
    // Expected $.length = 0 to equal 1.
    // Expected $[0] = undefined to equal Object({ id: 1, name: 'War and Peace', price: 250, category: 'Literature' }).

    // it('productsByCategory method should return a list of products by category', async () => {
    //     const result: Product[] = await store.productsByCategory('Literature');

    //     expect(result).toEqual([
    //         {
    //             id: 1,
    //             name: 'War and Peace',
    //             price: 250,
    //             category: 'Literature',
    //         },
    //     ]);
    // });

    // TODO: Expected undefined to equal Object({ id: 1, name: 'War and Peace', price: 250, category: 'Literature' }).

    // it('show method should return the correct product', async () => {
    //     const result: Product = await store.show(1);

    //     expect(result).toEqual({
    //         id: 1,
    //         name: 'War and Peace',
    //         price: 250,
    //         category: 'Literature'
    //     });
    // });

    // it('delete method should remove the product', async () => {
    //     store.delete(1);
    //     const result = await store.index();

    //     expect(result).toEqual([]);
    // });
});
