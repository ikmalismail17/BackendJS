import express from "express";
import deleteData from "../controller/deleteData.js"
import displayMongo from "../controller/displayMongo.js"
import insertData from "../controller/arduinoMongo.js";
import tempLogin from "../controller/templogin.js";
import adminLogin from "../controller/adminLogin.js";
import verifyToken from "../controller/verifyToken.js";
import dataAdmin from "../controller/dataAdmin.js";
import verifyAdmin from "../controller/verifyAdmin.js";
import dataReport from "../controller/dataReport.js";
import alarmReport from "../controller/alarmReport.js";
import displayReport from "../controller/displayReport.js";
import deleteReport from "../controller/deleteReport.js";
import reportPublish from "../controller/reportPublish.js";

const reqRoute = express.Router();

//post
reqRoute.post("/arduinodata", insertData); //insert from arduino
reqRoute.post("/templogin", tempLogin)
reqRoute.post("/login", adminLogin); //insert from web
reqRoute.post("/alarmreport", verifyToken, alarmReport)
reqRoute.post("/sendemail/:reportId", verifyToken, reportPublish)

//get
reqRoute.get("/datadisplay", displayMongo)
reqRoute.get("/protected", verifyToken)
reqRoute.get("/admininfo/:id", dataAdmin)
reqRoute.get("/datareport/:dataId", dataReport) 
reqRoute.get("/displayreport", displayReport) 

//delete
reqRoute.delete("/datadelete/:dataId", verifyToken, verifyAdmin ,deleteData)
reqRoute.delete("/reportdelete/:dataId", verifyToken, verifyAdmin ,deleteReport)

export default reqRoute;
