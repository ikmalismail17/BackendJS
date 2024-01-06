import mongoCon from '../connection/mongodb.js';
import bcrypt from 'bcrypt';
import { ObjectId } from "mongodb";

const verifyAdmin = async (req, res, next) => {
    try {

        await mongoCon.connect();
        
        const db = mongoCon.db('arduinofyp');
        const adminMongo = db.collection('admin');

        const { id, password } = req.body;

        const user = await adminMongo.findOne({_id: new ObjectId(id)});

        if (user && (await bcrypt.compare(password, user.password))) {
            console.log('Password match');
            next();
        } else {
            return res.status(601).json({ error: "Password doesn't match" });
        }

    } catch (error) {
        await mongoCon.close();
        console.error('Error:', error);
        return res.status(701).json({ error: 'Error at catch verifyAdmin' });

    }
};

export default verifyAdmin;
