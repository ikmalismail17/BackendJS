import mongoCon from "../connection/mongodb.js";
import { ObjectId } from "mongodb";

const editProfile = async (req, res) => {
    const { 
        firstname,
        email,
        lastname,
    } = req.body;

  try {
    
    // Ensure the database connection is established
    await mongoCon.connect();

    const database = mongoCon.db('arduinofyp');
    const admindata = database.collection('admin');

    const userId = req.params.id;

    // Update the admin data in the database
    const result = await admindata.updateOne(
        { _id: new ObjectId(userId) },
        {
            $set: {
                firstname: firstname,
                email: email,
                lastname: lastname,
            },
        }
    );

    // Check if the update was successful
    if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Admin data updated' });
    } else {
        res.status(601).json({ error: 'User not found' });
    }
    } catch (error) {
      console.error("Error in editProfile:", error);
      res.status(701).json({ error: 'Internal Server Error' });
    }finally {
      // Always close the connection, whether there's an error or not
      await mongoCon.close();
    }
}

export default editProfile;