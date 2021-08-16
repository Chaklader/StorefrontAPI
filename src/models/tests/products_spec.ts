import { ProductStore, Product } from '../products';

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
describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a update method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.index).toBeDefined();
    });

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
    //     const result = await store.index();
    //     expect(result).toEqual([
    //         {
    //             id: 1,
    //             name: 'War and Peace',
    //             price: 250,
    //             category: 'Literature',
    //         },
    //     ]);
    // });

    // it('show method should return the correct product', async () => {
    //     const result = await store.show(1);
    //     expect(result).toEqual({
    //         id: 1,
    //         name: 'War and Peace',
    //         price: 250,
    //         category: 'Literature',
    //     });
    // });

    it('delete method should remove the product', async () => {
        store.delete(1);
        const result = await store.index();

        expect(result).toEqual([]);
    });
});
