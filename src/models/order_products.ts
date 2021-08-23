// "id": 1,
// "quantity": 20,
// "order_id": "1",
// "product_id": "1"

import client from '../database';

export type OrderProducts = {
    id?: number;
    quantity: number;
    order_id: number;
    product_id: number;
};

export default OrderProducts;
