import mongoCon from "../connection/mongodb.js";
import { ObjectId } from "mongodb";

const adminData = async (req, res) => {
  try {
    
    // Ensure the database connection is established
    await mongoCon.connect();

    const database = mongoCon.db('arduinofyp');
    const arduinodata = database.collection('admin');

    const userId = req.params.id;

    // Use find to get a cursor for all documents in the collection
    const data = await arduinodata.findOne({_id: new ObjectId(userId)});

    // Print all documents
    res.json(data);
    } catch (error) {
      await mongoCon.close();
      console.error("Error in dataAdmin:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default adminData;