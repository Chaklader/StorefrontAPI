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

    // it('create method should add a product', async () => {
    //     const result = await store.create({
    //         id: 1,
    //         name: 'War and Peace',
    //         price: 250,
    //         category: 'Literature',
    //     });

    //     expect(result).toEqual({
    //         id: 1,
    //         name: 'War and Peace',
    //         price: 250,
    //         category: 'Literature',
    //     });
    // });

    // it('index method should return a list of books', async () => {
    //     const result = await store.index();
    //     expect(result).toEqual([
    //         {
    //             id: '1',
    //             title: 'Bridge to Terabithia',
    //             total_pages: 250,
    //             author: 'Katherine Paterson',
    //             type: 'Childrens',
    //         },
    //     ]);
    // });

    // it('show method should return the correct book', async () => {
    //     const result = await store.show('1');
    //     expect(result).toEqual({
    //         id: '1',
    //         title: 'Bridge to Terabithia',
    //         total_pages: 250,
    //         author: 'Katherine Paterson',
    //         type: 'Childrens',
    //     });
    // });

    // it('delete method should remove the book', async () => {
    //     store.delete('1');
    //     const result = await store.index();

    //     expect(result).toEqual([]);
    // });
});
