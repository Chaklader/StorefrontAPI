import { ProductStore, Product } from '../products';

const store = new ProductStore();

describe('Product Model', () => {
    let createdProductId: number = 0;

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
            name: 'War and Peace',
            price: 250,
            category: 'Literature',
        });

        if (result.id) {
            createdProductId = result.id;
        }

        expect(result).toEqual({
            id: createdProductId,
            name: 'War and Peace',
            price: 250,
            category: 'Literature',
        });
    });

    it('index method should return a list of products', async () => {
        const result: Product[] = await store.index();

        expect(result).toEqual([
            {
                id: 1,
                name: 'Bobby Fischer Teaches Chess',
                price: 457,
                category: 'Chess',
            },
            {
                id: 2,
                name: 'War and Peace',
                price: 250,
                category: 'Literature',
            },
        ]);

        console.log('---------ffff-------');
        console.log(result.length);
        console.log('\n');
        console.log(result);
        console.log('---------pppp-------');
    });

    it('productsByCategory method should return a list of products by category', async () => {
        const result: Product[] = await store.productsByCategory('Literature');

        expect(result).toEqual([
            {
                id: 2,
                name: 'War and Peace',
                price: 250,
                category: 'Literature',
            },
        ]);
    });

    it('show method should return the correct product', async () => {
        const result: Product = await store.show(2);

        expect(result).toEqual({
            id: 2,
            name: 'War and Peace',
            price: 250,
            category: 'Literature',
        });
    });

    it('delete method should remove the product', async () => {
        store.delete(createdProductId);
        const result = await store.index();

        const productIds: (number | undefined)[] = result.map(({ id }) => id);

        if (productIds && productIds.length > 0) {
            expect(false).toEqual(productIds.includes(createdProductId));
            return;
        }

        expect(result).toEqual([]);
    });
});
