import client from '../database';
import { Order } from '../models/orders';
import { Product } from '../models/products';

export type ProductsInOrders = {
    name: string;
    price: number;
    category: string;
    order_id: number;
};

export type UsersWithOrders = {
    firstName: string;
    lastName: string;
};

export type ExpensiveProducts = {
    name: string;
    price: number;
};

export class DashboardQueries {
    /* 
        Get all products that have been included in orders
    */
    public async productsInOrders(): Promise<ProductsInOrders[]> {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql =
                'SELECT name, price, category, order_id FROM products INNER JOIN order_products ON product.id = order_products.product_id';

            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`unable get products and orders: ${err}`);
        }
    }

    /* 
      Get all users that have made orders
    */
    public async usersWithOrders(): Promise<UsersWithOrders[]> {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql =
                'SELECT firstname, lastname FROM users INNER JOIN orders ON users.id = orders.user_id';

            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`unable get users with orders: ${err}`);
        }
    }

    /* 
       Get 5 most expensive products 
    */
    public async fiveMostExpensiveProducts(): Promise<
        ExpensiveProducts[]
    > {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql =
                'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';

            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`unable get products by price: ${err}`);
        }
    }

    /* 
       [OPTIONAL] Get 5 most popular products 
    */
    public async fiveMostPopularProducts(): Promise<Product[]> {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql =
                'SELECT * FROM products p INNER JOIN order_products op ON p.id=op.product_id ORDER BY op.quantity DESC LIMIT 5';

            const result = await conn.query(sql);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`unable get top 5 most sold products: ${err}`);
        }
    }

    public async showCurrentOrdersForUser(userId: number): Promise<Order[]> {
        {
            try {
                //@ts-ignore
                const conn = await client.connect();
                const SQL =
                    "SELECT * FROM orders o INNER JOIN order_products op ON o.id = op.order_id WHERE o.user_id=($1) AND o.status='open'";

                const result = await conn.query(SQL, [userId]);
                conn.release();

                return result.rows;
            } catch (err) {
                throw new Error(`unable get current orders: ${err}`);
            }
        }
    }

    public async showCompletedOrdersForUsers(userId: number): Promise<Order[]> {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const SQL =
                "SELECT * FROM orders o INNER JOIN order_products op ON o.id = op.order_id WHERE o.user_id=($1) AND o.status='close'";

            const result = await conn.query(SQL, [userId]);
            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`unable get current orders: ${err}`);
        }
    }
}
