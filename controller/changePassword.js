import mongoCon from "../connection/mongodb.js";
import { ObjectId } from "mongodb";
import bcrypt from 'bcryptjs';

const changePassword = async (req, res) => {
    const { 
        newPassword,
        oldPassword,
    } = req.body;

  try {
    
    // Ensure the database connection is established
    await mongoCon.connect();

    const database = mongoCon.db('arduinofyp');
    const admindata = database.collection('admin');

    const userId = req.params.id;

    // Fetch the existing admin data
    const existingAdmin = await admindata.findOne({ _id: new ObjectId(userId) });

    // Check if the old password matches
    const isPasswordMatch = await bcrypt.compare(oldPassword, existingAdmin.password);

    if (!isPasswordMatch) {
        return res.status(601).json({ error: 'Old password does not match' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the admin data in the database
    const result = await admindata.updateOne(
        { _id: new ObjectId(userId) },
        {
            $set: {
                password: hashedPassword,
            },
        }
    );

    // Check if the update was successful
    if (result.modifiedCount === 1) {
        res.status(200).json({ message: 'Password updated successfully' });
    } else {
        res.status(701).json({ error: 'User not found' });
    }
    } catch (error) {
      console.error("Error in editProfile:", error);
      res.status(801).json({ error: 'Internal Server Error' });
    }finally {
      // Always close the connection, whether there's an error or not
      await mongoCon.close();
    }
}

export default changePassword;