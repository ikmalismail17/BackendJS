import  mongoCon  from '../connection/mongodb.js';

// Function to insert data into MongoDB
const insertData = async (req, res) => {

    try {
        // Connect to the database
        await mongoCon.connect();

        // Select the database
        const database = mongoCon.db('arduinofyp');
        const arduinoMongo = database.collection('arduinodata');

        // Get the current time in Malaysia
        const currentTime = new Date().toLocaleTimeString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' });

        // Get the current date in Malaysia in the format "dd/mm/YYYY"
        const currentDate = new Date().toLocaleDateString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' });

        // Insert the data into the collection
        const result = await arduinoMongo.insertOne({
            distanceCm: req.body.distanceCm,
            distanceInch: req.body.distanceInch,
            time: currentTime,
            date: currentDate
        });

        console.log('Data inserted successfully:', result.insertedId);
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Failed to insert data' });
    } finally {
        // Close the connection
        await mongoCon.close();
    }
}

export default insertData;
