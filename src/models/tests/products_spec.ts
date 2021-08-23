import { ProductStore, Product } from '../products';

const store = new ProductStore();

describe('Product Model', () => {
    let TEST_PRODUCT: Product = {} as Product;

    beforeAll(function () {
        console.log('\n');
        console.log('Start to run the tests for the product model');
        console.log('\n');
    });

    afterAll(function () {
        console.log('\n');
        console.log('End of running all the tests for the product model');
        console.log('\n');
    });

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

    it('create method should add a product', async () => {
        const createdProduct = await store.create({
            name: 'War and Peace',
            price: 250,
            category: 'Literature',
        });

        TEST_PRODUCT = createdProduct;

        if (TEST_PRODUCT == null || TEST_PRODUCT.id == null) {
            throw new Error('Test product is not created ');
        }

        expect(createdProduct).toEqual({
            id: TEST_PRODUCT.id,
            name: 'War and Peace',
            price: 250,
            category: 'Literature',
        });
    });

    it('index method should return a list of products', async () => {
        const allProducts: Product[] = await store.index();

        expect(allProducts).toEqual([
            {
                id: TEST_PRODUCT.id,
                name: 'War and Peace',
                price: 250,
                category: 'Literature',
            },
        ]);
    });

    it('productsByCategory method should return a list of products by category', async () => {
        const allProductsByCategory: Product[] = await store.productsByCategory(
            'Literature'
        );

        expect(allProductsByCategory).toEqual([
            {
                id: TEST_PRODUCT.id,
                name: 'War and Peace',
                price: 250,
                category: 'Literature',
            },
        ]);
    });

    it('show method should return the correct product', async () => {
        if (TEST_PRODUCT == null || TEST_PRODUCT.id == null) {
            throw new Error('Test product is not created ');
        }

        const productById: Product = await store.show(TEST_PRODUCT.id);

        expect(productById).toEqual({
            id: TEST_PRODUCT.id,
            name: 'War and Peace',
            price: 250,
            category: 'Literature',
        });
    });

    it('delete method should remove the product', async () => {
        if (TEST_PRODUCT == null || TEST_PRODUCT.id == null) {
            throw new Error('Test product is not created ');
        }
        
        const deleteProduct = await store.delete(TEST_PRODUCT.id);
        const result = await store.index();

        expect(result).toEqual([]);
    });
});
