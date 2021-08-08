import client from '../database';

export type Order = {
    id?: number;
    userId: string;
    status: string;
};

export class OrderStore {
    async create(o: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [
                o.userId,
                o.status,
            ]);

            const newOrder = result.rows[0];
            conn.release();

            return newOrder;
        } catch (err) {
            throw new Error(
                `Could not add new order for user ID ${o.userId} for Error: ${err}`
            );
        }
    }

    async addProduct(
        quantity: number,
        orderId: number,
        productId: number
    ): Promise<Order> {
        try {
            const sql =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';

            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql, [
                quantity,
                orderId,
                productId,
            ]);

            const order = result.rows[0];
            conn.release();

            return order;
        } catch (err) {
            throw new Error(
                `Could not add order with ID ${orderId}. Error: ${err}`
            );
        }
    }

    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error(`Could not delete order ID ${id}. Error: ${err}`);
        }
    }
}
