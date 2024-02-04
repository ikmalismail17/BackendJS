import  mongoCon  from '../connection/mongodb.js';
import { ObjectId } from "mongodb";

// Function to insert data into MongoDB
const alarmReport = async (req, res, next) => {

    try {
        // Connect to the database
        await mongoCon.connect();

        // Select the database
        const database = mongoCon.db('arduinofyp');
        const report = database.collection('report');

        const { id, dataId, message } = req.body;

        // Check if dataId is empty
        if (!dataId || !message) {
            res.status(601).json({ error: 'Data Id or Message empty' });
            return;
        }

        // Get the current time in Malaysia
        const currentTime = new Date().toLocaleTimeString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' });

        // Get the current date in Malaysia in the format "dd/mm/YYYY"
        const currentDate = new Date().toLocaleDateString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' });

        // Insert the data into the collection
        await report.insertOne({
            adminId: new ObjectId(id),
            dataId: new ObjectId(dataId),
            message: message,
            date: currentDate,
            time: currentTime
        });

        console.log('Data inserted successfully');
        next();
        
    } catch (error) {
        await mongoCon.close();
        console.error('Error inserting data:', error);
        res.status(701).json({ error: 'Failed to insert data' });

    }
}

export default alarmReport;