import { MongoClient , ServerApiVersion } from "mongodb";

// Replace the uri string with your connection string.
const uri = "mongodb+srv://ikmalismail17:ikmalfyp2023@fypmongodb.1weu790.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoCon = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await mongoCon.connect();
    console.log("MongoDB connection success");
  } catch (error) {
    console.error("MongoDB connection unsuccessful", error);
  }
}

//call the connectToDatabase function
connectToDatabase();

export default mongoCon;