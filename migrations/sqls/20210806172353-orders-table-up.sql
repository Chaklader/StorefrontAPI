CREATE TABLE orders (id SERIAL PRIMARY KEY, product_id VARCHAR(50), quantity DECIMAL, user_id VARCHAR(50), status VARCHAR(10));