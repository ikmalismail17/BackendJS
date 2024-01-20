import  mongoCon  from '../connection/mongodb.js';

// Function to insert data into MongoDB
const addFeedback = async (req, res) => {

    try {
        // Connect to the database
        await mongoCon.connect();

        // Select the database
        const database = mongoCon.db('arduinofyp');
        const feedback = database.collection('feedback');

        // Insert the data into the collection
        const result = await feedback.insertOne({
            name: req.body.namefb,
            feedback: req.body.feedback
        });

        console.log('Data inserted successfully:', result.insertedId);
        res.status(200).json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(401).json({ error: 'Failed to insert data' });
    } finally {
        // Close the connection
        await mongoCon.close();
    }
}

export default addFeedback;