import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecretKey = process.env.SECRET_KEY;    // Secret key for JWT

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token not provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecretKey);
      req.user = decoded;  // Store user information in the request for later use
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token.' });
};

}

export default verifyToken;