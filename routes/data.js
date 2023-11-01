import express from "express";
const dataRoute = express.Router();
import serverData from "../controller/arduinoData.js";

//post
dataRoute.post("/arduinodata", serverData);

// dataRoute.post("/arduinodata", (req, res) => {});

export default dataRoute;