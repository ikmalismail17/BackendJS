import mongoCon from '../connection/mongodb.js';
import { ObjectId } from "mongodb";

const deleteData = async (req, res, next) => {
  try {
    await mongoCon.connect();
    const db = mongoCon.db('arduinofyp');
    const arduinodata = db.collection('arduinodata');

    const { dataId } = req.params; // Use the id parameter from the route
    const result = await arduinodata.deleteOne({ _id: new ObjectId(dataId) });

    if (result.deletedCount) {
      next();

    } else {
      return res.status(801).json({ error: 'No data found to delete' });
    }

  } catch (error) {
    await mongoCon.close();
    console.error("Error in deleteData:", error);
    return res.status(901).json({ error: 'Internal Server Error' });

  }
}

export default deleteData;
