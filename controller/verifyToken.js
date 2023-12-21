import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), jwtSecretKey);

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(501).json({ error: 'Invalid token.' });
    
  }
};


export default verifyToken;
