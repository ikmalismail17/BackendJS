import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoCon from '../connection/mongodb.js';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecretKey = process.env.SECRET_KEY;

const adminLogin = async (req, res) => {
    
    try {

        await mongoCon.connect();
        
        const db = mongoCon.db('arduinofyp');
        const adminMongo = db.collection('admin');

        const { email, password } = req.body;
        const user = await adminMongo.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const resToken = jwt.sign({ email }, jwtSecretKey);
            const userId = user._id;
            res.json({ resToken, userId });
        } else {
            res.status(401).json({ error: 'User not found!!' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }finally {
        // Close the connection
        await mongoCon.close();
    }
}

export default adminLogin;
