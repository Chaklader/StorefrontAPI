import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

/* 
BYCRYPT_PASSWORD=mary-had-a-little-lamb
SALT_ROUNDS=10
TOKEN_SECRET=mary
*/

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
};

const pepper = process.env.BYCRYPT_PASSWORD;
const saltRounds = '' + process.env.SALT_ROUNDS;



export class UsersManagement {
    async create(u: User): Promise<User> {
        try {

            const hashedPassword = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );

            const sql =
                'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [
                u.firstName,
                u.lastName,
                // u.password,
                hashedPassword
            ]);

            const newUser = result.rows[0];

            conn.release();

            return newUser;
        } catch (err) {
            throw new Error(
                `Could not add new user with name ${u.firstName} ${u.lastName}. Error: ${err}`
            );
        }
    }

    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users with error: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user with ID ${id}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [id]);

            const deletedUser = result.rows[0];

            conn.release();

            return deletedUser;
        } catch (err) {
            throw new Error(
                `Could not delete user with ID ${id}. Error: ${err}`
            );
        }
    }
}
