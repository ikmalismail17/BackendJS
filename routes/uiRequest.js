import express from "express";
import displayData from "../controller/dataDisplay.js";
import deleteData from "../controller/deleteData.js"
import displayMongo from "../controller/displayMongo.js"
const reqRoute = express.Router();


//get
// reqRoute.get("/datadisplay", displayData)
reqRoute.get("/datadisplay", displayMongo)

//delete
reqRoute.delete("/datadelete/:id", deleteData)

export default reqRoute;
