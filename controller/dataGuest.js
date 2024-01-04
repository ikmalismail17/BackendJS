import mongoCon from "../connection/mongodb.js";

const guestData = async (req, res) => {
  try {
    
    // Ensure the database connection is established
    await mongoCon.connect();

    const database = mongoCon.db('arduinofyp');
    const admindata = database.collection('admin');

    // Use find to get a cursor for all documents in the collection
    const result =  admindata.find();
    const data = await result.toArray();

    // Print all documents
    res.json(data);
    } catch (error) {
      await mongoCon.close();
      console.error("Error in dataAdmin:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default guestData;