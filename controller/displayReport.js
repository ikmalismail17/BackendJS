import mongoCon from "../connection/mongodb.js";

const displayReport = async (req, res) => {
  try {
    // Ensure the database connection is established
    await mongoCon.connect();

    const database = mongoCon.db('arduinofyp');
    const reportdata = database.collection('report');

    // Use aggregate with $lookup to include information from admin and data collections
    const result = await reportdata.aggregate([
      {
        $lookup: {
          from: 'admin',
          localField: 'adminId',
          foreignField: '_id',
          as: 'admin'
        }
      },
      {
        $lookup: {
          from: 'testing',
          localField: 'dataId',
          foreignField: '_id',
          as: 'data'
        }
      },
      // Other stages as needed
    ]).toArray();

    // Print all documents with additional information from admin and data collections
    res.json(result);

  } catch (error) {
    await mongoCon.close();
    console.error("Error in displayMongo:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default displayReport;
