import  mongoCon  from '../connection/mongodb.js';
import { ObjectId } from "mongodb";

// Function to insert data into MongoDB
const alarmReport = async (req, res) => {

    try {
        // Connect to the database
        await mongoCon.connect();

        // Select the database
        const database = mongoCon.db('arduinofyp');
        const report = database.collection('report');

        const { adminId, dataId, message } = req.body;

        // Check if dataId is empty
        if (!dataId || !message) {
            res.status(601).json({ error: 'Data Id or Message empty' });
            return;
        }

        // Get the current time
        const currentTime = new Date().toLocaleTimeString();

        // Get the current date in the format "dd/mm/YYYY"
        const currentDate = new Date().toLocaleDateString('en-GB')

        // Insert the data into the collection
        await report.insertOne({
            adminId: new ObjectId(adminId),
            dataId: new ObjectId(dataId),
            message: message,
            date: currentDate,
            time: currentTime
        });

        console.log('Data inserted successfully');
        res.status(200).json({ message: 'Data inserted successfully' });
        
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(701).json({ error: 'Failed to insert data' });

    } finally {
        // Close the connection
        await mongoCon.close();
    }
}

export default alarmReport;