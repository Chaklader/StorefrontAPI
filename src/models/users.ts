import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    email: string;
};

const pepper = process.env.BYCRYPT_PASSWORD;
const saltRounds = '' + process.env.SALT_ROUNDS;

export class UsersManagement {
    async create(u: User): Promise<User> {
        try {
            const sql =
                'INSERT INTO users (first_name, last_name, password, role, email) VALUES($1, $2, $3, $4, $5) RETURNING *';
            // @ts-ignore
            const conn = await client.connect();

            console.log(
                u.firstName +
                    ' ' +
                    u.lastName +
                    ' ' +
                    u.password +
                    ' ' +
                    u.role +
                    ' ' +
                    u.email
            );
            const result = await conn.query(sql, [
                u.firstName,
                u.lastName,
                u.password,
                u.role,
                u.email,
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

    async update(u: User): Promise<User> {
        try {
            const sql =
                'UPDATE users SET first_name=($1), last_name=($2), password=($3), role=($4), email=($5) WHERE id=($6)';
            // @ts-ignore
            const conn = await client.connect();

            const result = await conn.query(sql, [
                u.firstName,
                u.lastName,
                u.password,
                u.role,
                u.email,
                u.id,
            ]);

            const updatedUser = result.rows[0];
            conn.release();

            return updatedUser;
        } catch (err) {
            throw new Error(
                `Could not updated user with name ${u.firstName} ${u.lastName}. Error: ${err}`
            );
        }
    }

    async login(email: string, password: string): Promise<User | null> {
        const conn = await client.connect();
        const sql = 'SELECT * FROM users WHERE email=($1)';

        const result = await conn.query(sql, [email]);

        if (result.rows.length) {
            const user = result.rows[0];

            if (bcrypt.compareSync(password + pepper, user.password)) {
                return user;
            }
        }

        return null;
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
