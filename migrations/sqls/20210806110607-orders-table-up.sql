/* Replace with your SQL commands */


/* 

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
 */
 
CREATE TABLE orders (id SERIAL PRIMARY KEY, product_id VARCHAR(50), quantity DECIMAL, user_id VARCHAR(50), status VARCHAR(10));