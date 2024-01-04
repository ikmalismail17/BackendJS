import  mongoCon  from '../connection/mongodb.js';
import bcrypt from 'bcrypt';

// Function to insert data into MongoDB
const addNewGuest = async (req, res) => {
    // await mongoCon.connect();

    // const db = mongoCon.db('arduinofyp');
    // const adminMongo = db.collection('admin');

    // const password = 'ikmal12345';
    // const saltRounds = 10;

    // bcrypt.hash(password, saltRounds, function(err, hash) {
    //     if (err) throw err;
    
    //     // Now, 'hash' contains the hashed password
    //     adminMongo.insertOne({
    //         email: 'ikmalismail@gmail.com',
    //         firstname: 'Ikmal',
    //         lastname: 'Ismail',
    //         password: hash,
    //     });

    //     console.log('Temp Login Success Insert');
    // });
    try {
        // Connect to the database
        await mongoCon.connect();

        // Select the database
        const database = mongoCon.db('arduinofyp');
        const adminMongo = database.collection('admin');

        const { key, email, firstname, lastname, role, password } = req.body;

        // Check if dataId is empty
        if (!email || !role || !password) {
            res.status(601).json({ error: "There's empty input" });
            return;
        }

        // Hash the password before insertion
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkEmail = await adminMongo.findOne({ email: email });

        if (checkEmail) {
            res.status(701).json({ error: 'Email already exists' });
            return;
        }else{

            // Insert the data into the collection
            const result = await adminMongo.insertOne({
                key: key,
                email: email,
                firstname: firstname,
                lastname: lastname,
                role: 2,
                password: hashedPassword
            });

            console.log('Temp Login Success Insert', result.email);
            res.status(200).json({ message: 'Data inserted successfully' });
        }

    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(801).json({ error: 'Failed to insert data' });
    } finally {
        // Close the connection
        await mongoCon.close();
    }
}

export default addNewGuest;
