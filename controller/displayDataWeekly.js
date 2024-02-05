import mongoCon from "../connection/mongodb.js";

const displayDataWeekly = async (req, res) => {
  try {
    // Ensure the database connection is established
    await mongoCon.connect();

    const database = mongoCon.db('arduinofyp');
    const arduinodata = database.collection('testing');

    // Extract parameters from the request URL
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    console.log(startDate);
    console.log(endDate);

    // Use find to get a cursor for documents within the date range
    const search = arduinodata.find({
      date: {
        $gte: startDate, // Greater than or equal to startDate
        $lte: endDate,   // Less than or equal to endDate
      },
    });

    // Convert the cursor to an array of documents
    const data = await search.toArray();

    // Return the filtered data
    res.json(data);
  } catch (error) {
    await mongoCon.close();
    console.error("Error in displayMongo:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default displayDataWeekly;
