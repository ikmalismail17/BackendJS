import express from "express";
import displayData from "../controller/dataDisplay.js";
import deleteData from "../controller/deleteData.js"
const reqRoute = express.Router();


//get
reqRoute.get("/datadisplay", displayData)

//delete
reqRoute.delete("/datadelete/:id", deleteData)

export default reqRoute;
