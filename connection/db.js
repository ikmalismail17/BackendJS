import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'arduinofyp'
})

connection.connect((err) =>{
    if (err){
        console.log("Database connection is failed: ", err);
        return;
    }
    console.log("Database connection is successfull");
})

export default connection;