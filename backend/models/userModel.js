// redisClient.js
import client from '../redisclient.js';
import bcrypt from 'bcrypt';

export const createUser = async (username, password) => {
    const id = `user:${username}`;
    const exists = await client.exists(id);

    if (exists) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await client.hSet(id, { username, password: hashedPassword });
    return { username };
};

export const getUserByUsername = async (username) => {
    const id = `user:${username}`;
    const user = await client.hGetAll(id);
    return Object.keys(user).length ? user : null;
};
