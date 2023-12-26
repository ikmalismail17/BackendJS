import mongoCon from "../connection/mongodb.js";
import { ObjectId } from "mongodb";

const dataReport = async (req, res) => {
    try {
        
        // Ensure the database connection is established
        await mongoCon.connect();

        const database = mongoCon.db('arduinofyp');
        const arduinodata = database.collection('arduinodata');

        const { dataId } = req.params;
        const result = await arduinodata.findOne({ _id: new ObjectId(dataId) });

        // Print the found document
        res.json(result);
    } catch (error) {
                await mongoCon.close();
                console.error("Error in displayMongo:", error);
                res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default dataReport;