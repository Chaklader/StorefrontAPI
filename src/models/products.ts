import client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category?: string;
};

export class ProductStore {
    async create(p: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [p.name, p.price, p.category]);

            const newProduct = result.rows[0];
            let parsedNewProduct: any = JSON.parse(JSON.stringify(newProduct));

            conn.release();

            return newProduct;
        } catch (err) {
            throw new Error(
                `Could not add new product ${p.name} with ID ${p.id}. Error: ${err}`
            );
        }
    }

    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not GET products with error: ${err}`);
        }
    }

    async productsByCategory(category: string): Promise<Product[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';

            const result = await conn.query(sql, [category]);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(
                `Could not GET products by ${category} for error: ${err}`
            );
        }
    }

    async show(id: number): Promise<Product> {
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

    async delete(id: number): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            const delProduct = result.rows[0];

            conn.release();

            return delProduct;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
