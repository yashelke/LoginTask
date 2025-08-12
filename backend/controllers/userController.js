// controllers/userController.js
import { createUser, getUserByUsername } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// const JWT_SECRET = 'your_jwt_secret_key'; 

const JWT_SECRET = process.env.JWT_SECRET;
    
export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password required' });
        }

        const user = await createUser(username, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// export const loginUser = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await getUserByUsername(username);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
//         res.json({ message: 'Login successful', token });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

export const loginUser = async (req, res) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET; // read env variable here
        if (!JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret key is not set' });
        }

        const { username, password } = req.body;
        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

