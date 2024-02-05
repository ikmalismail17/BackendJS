import express from "express";
import deleteData from "../controller/deleteData.js"
import displayMongo from "../controller/displayMongo.js"
import insertData from "../controller/arduinoMongo.js";
import addNewGuest from "../controller/guestlogin.js";
import adminLogin from "../controller/adminLogin.js";
import verifyToken from "../controller/verifyToken.js";
import dataAdmin from "../controller/dataAdmin.js";
import verifyAdmin from "../controller/verifyAdmin.js";
import dataReport from "../controller/dataReport.js";
import alarmReport from "../controller/alarmReport.js";
import displayReport from "../controller/displayReport.js";
import deleteReport from "../controller/deleteReport.js";
import reportPublish from "../controller/reportPublish.js";
import editProfile from "../controller/editProfile.js";
import changePassword from "../controller/changePassword.js";
import dataGuest from "../controller/dataGuest.js";
import deleteGuest from "../controller/deleteGuest.js";
import logActivity from "../controller/logActivity.js";
import logDisplay from "../controller/logDisplay.js";
import displayFeedback from "../controller/displayFeedback.js";
import addFeedback from "../controller/addFeedback.js";
import displayDataWeekly from "../controller/displayDataWeekly.js";

const reqRoute = express.Router();

//post
reqRoute.post("/arduinodata", insertData); //insert from arduino
reqRoute.post("/login", adminLogin); //insert from web
reqRoute.post("/alarmreport/:dataId", verifyToken, alarmReport, logActivity)
reqRoute.post("/sendemail/:dataId", verifyToken, reportPublish, logActivity)
reqRoute.post("/editprofile/:id", verifyToken, editProfile)
reqRoute.post("/changepassword/:id", verifyToken, changePassword)
reqRoute.post("/addnewguest", verifyToken, addNewGuest)
reqRoute.post("/addfeedback", addFeedback)

//get
reqRoute.get("/datadisplay", displayMongo)
reqRoute.get("/datadisplayweekly", displayDataWeekly);
reqRoute.get("/feedbackdisplay", displayFeedback)
reqRoute.get("/logdisplay", logDisplay)
reqRoute.get("/protected", verifyToken)
reqRoute.get("/admininfo/:id", dataAdmin)
reqRoute.get("/guestinfo", dataGuest)
reqRoute.get("/datareport/:dataId", dataReport) 
reqRoute.get("/displayreport", displayReport) 

//delete
reqRoute.delete("/datadelete/:dataId", verifyToken, verifyAdmin ,deleteData, logActivity)
reqRoute.delete("/reportdelete/:dataId", verifyToken, verifyAdmin ,deleteReport, logActivity)
reqRoute.delete("/guestdelete/:guestId", verifyToken, verifyAdmin, deleteGuest)

export default reqRoute;
