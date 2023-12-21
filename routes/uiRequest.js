import express from "express";
import deleteData from "../controller/deleteData.js"
import displayMongo from "../controller/displayMongo.js"
import insertData from "../controller/arduinoMongo.js";
import tempLogin from "../controller/templogin.js";
import adminLogin from "../controller/adminLogin.js";
import verifyToken from "../controller/verifyToken.js";
import dataAdmin from "../controller/dataAdmin.js";
import verifyAdmin from "../controller/verifyAdmin.js";

const reqRoute = express.Router();

//post
reqRoute.post("/arduinodata", insertData); //insert from arduino
reqRoute.post("/templogin", tempLogin)
reqRoute.post("/login", adminLogin); //insert from web

//get
reqRoute.get("/datadisplay", displayMongo)
reqRoute.get("/protected", verifyToken)
reqRoute.get("/admininfo/:id", dataAdmin)

//delete
reqRoute.delete("/datadelete/:dataId", verifyToken, verifyAdmin ,deleteData)

export default reqRoute;
