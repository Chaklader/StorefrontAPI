import client from '../database';

/* 
#### Product
-  id
- name
- price
- [OPTIONAL] category
*/

export type Product = {
    id?: number;
    name: string;
    price: number;
    category?: string;
};

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products with error: ${err}`);
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id} with error: ${err}`);
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (name, price, category) VALUES($1, $2, $3, $4) RETURNING *';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [
                p.name,
                p.price,
                p.category,
            ]);

            const newProduct = result.rows[0];

            conn.release();

            return newProduct;
        } catch (err) {
            throw new Error(`Could not add new product ${p.name} with ID ${p.id}. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            const book = result.rows[0];

            conn.release();

            return book;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
