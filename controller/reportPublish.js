import mongoCon from '../connection/mongodb.js';
import { ObjectId } from "mongodb";
import nodemailer from 'nodemailer';

const reportPublish = async (req, res) => {
  const { reportId } = req.params;
  const { 
    to,
    subject, 
    message,
    name,
    dataCm,
    dataInch,
    dataDate,
    dataTime
  } = req.body;

  const recipientName = to.split('@')[0];

  try {
  console.log("Report Id: ", reportId);
  console.log(`Sending email to: ${to}`);
  console.log("Subject: ", subject);
  console.log("Message: ", message);
  console.log("Name: ", name);
  console.log("Data in Cm: ", dataCm);
  console.log("Data in Inch: ", dataInch);
  console.log("Data date: ", dataDate);
  console.log("Data time: ", dataTime);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rivdepmon@gmail.com',
      pass: 'aumk evjw orrz puny', // Use an App Password here
    },
  });
  
  // Example email options
  const mailOptions = {
    from: 'rivdepmon@gmail.com',
    to: to,
    subject: subject,
    text: `Hello ${recipientName},\n\n${message}\n\nDetails:\n\n`
    + `Distance (cm): ${dataCm}\n`
    + `Distance (Inch): ${dataInch}\n`
    + `Date: ${dataDate}\n`
    + `Time: ${dataTime}\n\n\n`
    + `Sincerely:\n`
    + `RivDepMon Team, ${name}\n`
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(601).json({ error: 'Error Sending Email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
  } catch (error) {
    console.error('Error processing email request:', error);
    res.status(701).json({ error: 'Internal server error' });
  }

}

export default reportPublish;