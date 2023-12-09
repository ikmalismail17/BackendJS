import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoCon = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await mongoCon.connect();
    console.log("MongoDB connection success");
  } catch (error) {
    console.error("MongoDB connection unsuccessful", error);
  }
}

// Call the connectToDatabase function
connectToDatabase();

export default mongoCon;