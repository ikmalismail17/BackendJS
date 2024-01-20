import mongoCon from "../connection/mongodb.js";

const displayFeedback = async (req, res) => {
  try {
    
    // Ensure the database connection is established
    await mongoCon.connect();

    const database = mongoCon.db('arduinofyp');
    const feedback = database.collection('feedback');

    // Use find to get a cursor for all documents in the collection
    const search = feedback.find();

    // Convert the cursor to an array of documents
    const data = await search.toArray();

    // Print all documents
    res.json(data);
  } catch (error) {
    await mongoCon.close();
    console.error("Error in displayMongo:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default displayFeedback;