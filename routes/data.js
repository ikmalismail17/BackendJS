import express from "express";
const dataRoute = express.Router();
import serverData from "../controller/arduinoData.js";
import insertData from "../controller/arduinoMongo.js";

//post data to mysql
// dataRoute.post("/arduinodata", serverData);

//post data to mongodb
dataRoute.post("/arduinodata", insertData);

// dataRoute.post("/arduinodata", (req, res) => {});

export default dataRoute;