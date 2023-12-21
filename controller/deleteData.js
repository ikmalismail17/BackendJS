import mongoCon from '../connection/mongodb.js';
import { ObjectId } from "mongodb";

const deleteData = async (req, res) => {
  try {
    await mongoCon.connect();

    const db = mongoCon.db('arduinofyp');
    const arduinodata = db.collection('arduinodata');

    const { dataId } = req.params; // Use the id parameter from the route
    const result = await arduinodata.deleteOne({ _id: new ObjectId(dataId) });

    if (result.deletedCount) {
      res.status(200).json({ message: 'Data Delete' });
    } else {
      return res.status(801).json({ error: 'No data found to delete' });
    }

  } catch (error) {
    console.error("Error in deleteData:", error);
    return res.status(901).json({ error: 'Internal Server Error' });

  } finally {
    // Always close the connection, whether there's an error or not
    await mongoCon.close();
  }
}

export default deleteData;
