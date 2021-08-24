import client from '../database';
import OrderProducts from './order_products';

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

    /* 
        
    */
    async addProduct(
        quantity: number,
        orderId: number,
        productId: number,
        userId: number
    ): Promise<OrderProducts> {
        try {
            //@ts-ignore

            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const conn = await client.connect();

            const findOrderById = await conn.query(sql, [orderId]);
            const order = findOrderById.rows[0];

            if (order.status !== 'open') {
                conn.release();

                throw new Error(
                    `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
                );
            }

            conn.release();
        } catch (err) {
            throw new Error(
                `We dont find the order by the ID and error: ${err} is received`
            );
        }

        try {
            // @ts-ignore
            const conn = await client.connect();

            const sql1 =
                'SELECT * FROM order_products WHERE order_id=($1) AND product_id=($2)';
            const isOrderExistForGivenProduct = await conn.query(sql1, [
                orderId,
                productId,
            ]);

            const sql0 = 'SELECT * FROM orders WHERE id=($1)';
            const result0 = await conn.query(sql0, [orderId]);

            const uId: number = JSON.parse(
                JSON.stringify(result0.rows[0])
            ).user_id;
            const isOrderExistForSameProduct: boolean =
                isOrderExistForGivenProduct.rows[0] == null;

                

            /* 
                update the quantity for an existing order
            */
            if (!isOrderExistForSameProduct) {
                
                const isUserIdMatchesBetweenDbANDULR = !uId || uId != userId;
                if (isUserIdMatchesBetweenDbANDULR) {
                    
                    conn.release();

                    throw new Error(
                        "Order Id for the respective user doesn't match"
                    );
                }
                

                const resultValue = isOrderExistForGivenProduct.rows[0];

                const qty: number = JSON.parse(
                    JSON.stringify(resultValue)
                ).quantity;

                const orderProductId: number = JSON.parse(
                    JSON.stringify(resultValue)
                ).id;
                const updatedQty: number = +qty + +quantity;

                const sql2 =
                    'UPDATE order_products SET quantity=($1) WHERE id=($2)';
                const c =  await conn.query(sql2, [updatedQty, orderProductId]);

                const sql3 = 'SELECT * FROM order_products WHERE id=($1)';
                const orderProductTableResponse = await conn.query(sql3, [
                    orderProductId
                ]);

                conn.release();
                return orderProductTableResponse.rows[0];
            }

            /* 
                insert a new entry in the order_products table 
            */
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
