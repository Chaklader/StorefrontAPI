import { OrderProducts, OrderProductsStore } from './../order_products';

import { Product, ProductStore } from '../products';
import { OrderStore, Order } from '../orders';
import { UsersManagement, User } from '../users';

const uStore = new UsersManagement();
const pStore = new ProductStore();
const orderStore = new OrderStore();
const orderProductsStore = new OrderProductsStore();

describe('Order Model', () => {
    let TEST_USER: User = {} as User;
    let TEST_ORDER: Order = {} as Order;
    let TEST_ORDER_PRODUCTS: OrderProducts = {} as OrderProducts;
    let TEST_PRODUCT: Product = {} as Product;

    beforeAll(async () => {
        TEST_USER = await uStore.create({
            firstname: 'merlion',
            lastname: 'monroe',
            password: 'password',
            role: 'ADMIN',
            email: 'm.monroe@gmail.com',
        });

        TEST_PRODUCT = await pStore.create({
            name: 'Bobby Fischer Teaches Chess',
            price: 457,
            category: 'Chess',
        });
    });

    afterAll(async () => {
        if (TEST_PRODUCT == null || TEST_PRODUCT.id == null) {
            throw new Error('Test product is not created ');
        }

        if (TEST_USER == null || TEST_USER.id == null) {
            throw new Error('Test user is not created ');
        }

    
        await pStore.delete(TEST_PRODUCT.id);
        await uStore.delete(TEST_USER.id);
    });

    it('should have a create method', () => {
        expect(orderStore.create).toBeDefined();
    });

    it('should have a addProduct method', () => {
        expect(orderStore.addProduct).toBeDefined();
    });

    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(orderStore.delete).toBeDefined();
    });

    it('create method should add an order', async () => {
        if (TEST_USER == null || TEST_USER.id == null) {
            throw new Error('Test user is not created ');
        }

        const createdOrder = await orderStore.create({
            userId: TEST_USER.id,
            status: 'open',
        });

        TEST_ORDER = createdOrder;

        let testOrderAsStr: string = JSON.stringify(TEST_ORDER);
        let testOrderAsJSONStr: any = JSON.parse(testOrderAsStr);

        expect(testOrderAsJSONStr).toEqual({
            id: 1,
            status: 'open',
            user_id: '1',
        });
    });

    it('addProduct method should add products to an order with new entry in the order_products table', async () => {
        if (TEST_USER == null || TEST_USER.id == null) {
            throw new Error('Test user is not created ');
        }

        if (TEST_PRODUCT == null || TEST_PRODUCT.id == null) {
            throw new Error('Test product is not created ');
        }

        if (TEST_ORDER == null || TEST_ORDER.id == null) {
            throw new Error('Test product is not created ');
        }

        const result = await orderStore.addProduct(
            150,
            TEST_ORDER.id,
            TEST_PRODUCT.id,
            TEST_USER.id
        );

        TEST_ORDER_PRODUCTS = result;

        expect(JSON.parse(JSON.stringify(result))).toEqual({
            id: 1,
            quantity: 150,
            order_id: '1',
            product_id: '1',
        });
    });

    it('index method should return a list of orders', async () => {
        if (TEST_USER == null || TEST_USER.id == null) {
            throw new Error('Test user is not created ');
        }

        const allOrders = await orderStore.index();

        let allOrdersAsStr: string = JSON.stringify(allOrders);
        let expectedOrders: string = JSON.stringify([
            {
                id: TEST_ORDER.id,
                status: 'open',
                user_id: TEST_USER.id + '',
            },
        ]);

        expect(allOrdersAsStr).toContain(expectedOrders);
    });

    it('show method should return the correct order', async () => {
        const orderById = await orderStore.show(1);

        let orderAsStr: string = JSON.stringify(orderById);
        let orderAsJSONStr: any = JSON.parse(orderAsStr);

        expect(orderAsJSONStr).toEqual({
            id: 1,
            status: 'open',
            user_id: '1',
        });
    });

    it('delete method should remove the order', async () => {
        if (TEST_ORDER == null || TEST_ORDER.id == null) {
            throw new Error('Test order is not created ');
        }

        if (TEST_ORDER_PRODUCTS == null || TEST_ORDER_PRODUCTS.id == null) {
            throw new Error('No product is added to an order');
        }

        await orderProductsStore.truncate();
        orderStore.delete(TEST_ORDER.id);

        const result = await orderStore.index();
        expect(result).toEqual([]);
    });
});
