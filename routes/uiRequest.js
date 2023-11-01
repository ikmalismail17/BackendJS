import express from "express";
import displayData from "../controller/dataDisplay.js";
const reqRoute = express.Router();


//get
reqRoute.get("/datadisplay", displayData)

export default reqRoute;
