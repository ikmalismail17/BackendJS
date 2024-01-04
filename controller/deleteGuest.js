import mongoCon from '../connection/mongodb.js';
import { ObjectId } from "mongodb";

const deleteGuest = async (req, res) => {
  try {
    await mongoCon.connect();

    const db = mongoCon.db('arduinofyp');
    const admindata = db.collection('admin');

    const { guestId } = req.params; // Use the id parameter from the route
    const result = await admindata.deleteOne({ _id: new ObjectId(guestId) });

    if (result.deletedCount) {
      res.status(200).json({ message: 'Guest Delete' });
    } else {
      return res.status(601).json({ error: 'No data found to delete' });
    }

  } catch (error) {
    console.error("Error in deleteData:", error);
    return res.status(701).json({ error: 'Internal Server Error' });

  } finally {
    // Always close the connection, whether there's an error or not
    await mongoCon.close();
  }
}

export default deleteGuest;