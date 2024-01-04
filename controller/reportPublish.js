import mongoCon from '../connection/mongodb.js';
import { ObjectId } from "mongodb";
import nodemailer from 'nodemailer';

const reportPublish =  (req, res, next) => {
  const { reportId } = req.params;
  const { 
    to,
    subject, 
    message,
    name,
    dataCm,
    dataInch,
    dataDate,
    dataTime,
    adminId
  } = req.body;

  const recipientName = to.split('@')[0];

  try {

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
    text: `Hello ${recipientName},\n\nI trust this message finds you well. I am writing to provide the daily update on our River Depth Monitoring System, an essential tool in ensuring the safety and stability of our river.\n\n${message}\n\nDetails:\n\n`
    + `Distance (cm): ${dataCm}\n`
    + `Distance (Inch): ${dataInch}\n`
    + `Date: ${dataDate}\n`
    + `Time: ${dataTime}\n\n\n`
    + `Sincerely:\n`
    + `RivDepMon Team`
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(601).json({ error: 'Error Sending Email' });
    } else {
      console.log('Email sent:', info.response);
      next();
    }

    
  });
  } catch (error) {
    console.error('Error processing email request:', error);
    res.status(701).json({ error: 'Internal server error' });
  }

}

export default reportPublish;