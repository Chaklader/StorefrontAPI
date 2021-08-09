/* 
    The dashboard will run SQL queries to READ information from the database, 
    but any actions on the database should be done through a model. This dashboard 
    file is simply allowing us to isolate our informational queries together 
    in one place, rather than spread them out across all the models. Generally, 
    only the bussiness logic will be presented here or other files in the service
    directory. 
*/
import client from '../database';
import { Order } from '../models/orders';

export class DashboardQueries {
    /* 
        Get all products that have been included in orders
    */
    async productsInOrders(): Promise<
        {
            name: string;
            price: number;
            category: string;
            order_id: number;
        }[]
    > {
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
    async usersWithOrders(): Promise<
        {
            firstName: string;
            lastName: string;
        }[]
    > {
        try {
            //@ts-ignore
            const conn = await client.connect();
            const sql =
                'SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id';

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
    async fiveMostExpensiveProducts(): Promise<
        {
            name: string;
            price: number;
        }[]
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
        find all the current (open) orders for a certain user
    */
    async showCurrentOrders(userId: number): Promise<Order[]> {
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

    /* 
        find all the completed orders for a certain user
    */
    async showCompletedOrders(userId: number): Promise<Order[]> {
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
