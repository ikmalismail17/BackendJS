import mongoCon from "../connection/mongodb.js";

const displayMongo = async (req, res) => {
  try {
    
    // Ensure the database connection is established
    await mongoCon.connect();

    const database = mongoCon.db('arduinofyp');
    const arduinodata = database.collection('arduinodata');

    // Use find to get a cursor for all documents in the collection
    const search = arduinodata.find();

    // Convert the cursor to an array of documents
    const data = await search.toArray();

    // Print all documents
    res.json(data);
    } catch (error) {
        console.error("Error in displayMongo:", error);
        res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoCon.close();
  }
}

export default displayMongo;