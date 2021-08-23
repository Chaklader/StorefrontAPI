import { parse } from 'dotenv';
import client from '../database';

export type Order = {
    id?: number;
    userId: number;
    status: string;
};

export class OrderStore {
    async create(o: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await client.connect();

            if (o.status != 'open') {
                console.log('We can only create an order that is open....');
            }
            const result = await conn.query(sql, [o.userId, 'open']);

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
        productId: number,
        userId: number
    ): Promise<Order> {
        /* 
            check if the orer status is "open" so we can add products to the respective order
        */

            console.log(quantity+' '+
                orderId+' '+
                productId+' '+
                userId+' ');
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            //@ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [orderId]);
            const order = result.rows[0];

            if (order.status !== 'open') {
                throw new Error(
                    `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
                );
            }

            conn.release();
        } catch (err) {
            throw new Error(`${err}`);
        }

        /* 
            As the oder is open, please, add products to the order.
        */
        try {
            // @ts-ignore
            
            const conn = await client.connect();

            const sql1 =
                'SELECT * FROM order_products WHERE order_id=($1) AND product_id=($2)';

            console.log(`SELECT * FROM order_products WHERE order_id={o} AND product_id={p}`, orderId, productId);    
            const result1 = await conn.query(sql1, [orderId, productId]);

            const sql0 = 'SELECT * FROM orders WHERE id=($1)';
            const result0 = await conn.query(sql0, [orderId]);

            const uId: number = JSON.parse(JSON.stringify(result0)).user_id;


            console.log('mmmmmmmmmmmmmmmmmmmmmmm');
            // console.log(result1);
            console.log('\n');
            console.log(result0.rows[0]);
            console.log('\n');
            console.log('mmmmmmmmmmmmmmmmmmmmmmm');

            const b:boolean = result1 !=null && result1 != undefined;
            console.log('00000000000');
            console.log('boolran = ' + b);
            console.log('00000000000');

            if (result1 !=null && result1 != undefined && result1.rows[0] !=null && result1.rows[0] != undefined) {
                console.log('ttttttttttttttt1');
                if (!uId || uId != userId) {
                    // throw new Error(
                    //     "Order Id for the respective user doesn't match"
                    // );

                    console.log("Order Id for the respective user doesn't match");
                }

                /* 
                    {
                        "id": 1,
                        "quantity": 20,
                        "order_id": "1",
                        "product_id": "1"
                    }
                */
                const tut = result1.rows[0];
                const orderProductId: number = JSON.parse(
                    JSON.stringify(tut)
                ).id;

                const qty: number = JSON.parse(JSON.stringify(tut)).quantity;
                const updatedQty: number = +qty + +quantity;

                const sql2 =
                    'UPDATE order_products SET quantity=($1) WHERE id=($2)';
                const sql3 = 'SELECT * FROM order_products WHERE id=($1)';

                const result2 = await conn.query(sql2, [
                    updatedQty,
                    orderProductId,
                ]);

                const e = result2.rows[0];
                console.log(e);

                const result3 = await conn.query(sql3, [orderProductId]);

                const f = result3.rows[0];
                console.log(f);

                conn.release();

                return f;
            }

            console.log('ttttttttttttttt2');

            const sql =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';

            const result = await conn.query(sql, [
                quantity,
                orderId,
                productId,
            ]);

            const orderProduct = result.rows[0];
            conn.release();

            return orderProduct;
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
