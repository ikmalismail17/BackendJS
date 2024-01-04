import mongoCon from '../connection/mongodb.js';
import { ObjectId } from "mongodb";

const logActivity = async (req, res) => {
  try {
    await mongoCon.connect();

    const db = mongoCon.db('arduinofyp');
    const admindata = db.collection('admin');
    const logdata = db.collection('log');

    const { id } = req.body;

    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString('en-GB');

    const user = await admindata.findOne({ _id: new ObjectId(id) });

      if(user.role === 2) {
      // Insert the data into the collection
      const insertLogData = await logdata.insertOne({
          adminId: new ObjectId(id),
          key: user.key,
          action: 'Delete Depth Data',
          date: currentDate,
          time: currentTime
      });
    }else if(user.role === 1){
      // Insert the data into the collection
      const insertLogData = await logdata.insertOne({
          adminId: new ObjectId(id),
          key: "admin (me)",
          action: 'Delete Depth Data',
          date: currentDate,
          time: currentTime
      });
    }

    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    await mongoCon.close();
    console.error("Error in logActivity:", error);
    return res.status(701).json({ error: 'Internal Server Error' });

  }
}

export default logActivity;