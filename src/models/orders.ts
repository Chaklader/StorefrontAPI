/* 

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
*/

export type Order = {
    id?: string;
    product_id: string;
    quantity: number;
    user_id: string;
    status: string;
};
