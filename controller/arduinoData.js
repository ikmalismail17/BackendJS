import connection from "../connection/db.js";

const serverData = (req,res) =>{
  console.log("Received a POST request from Arduino");
    if (req.method === 'POST' && req.url === '/arduinodata') {
        let data = '';
        req.on('data', (chunk) => {
          data += chunk;
        });
        req.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            console.log('Received data: ', jsonData);
      
            // Access the data values
            const distanceCm = jsonData.distanceCm;
            const distanceInch = jsonData.distanceInch;
      
            // Process and use the data as needed
            console.log('Distance CM: ', distanceCm);
            console.log('Distance in Inch: ', distanceInch);
      
            // Insert data into the database
            const sql = 'INSERT INTO arduinodata (distanceCm, distanceInch) VALUES (?, ?)';
            const values = [distanceCm, distanceInch];
  
            connection.query(sql, values, (error, results) => {
              if (error) {
                console.error('Database insert error:', error);
                res.statusCode = 500; // Internal server error
                res.end('Error inserting data into the database.');
              } else {
                console.log('Data inserted into the database.');
                res.statusCode = 200;
                res.end('Data received and inserted into the database.');
              }
            });
          } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.statusCode = 400; // Bad request
            res.end('Invalid JSON data.');
          }
        });
      } else {
        res.statusCode = 404;
        res.end('Not Found');
      }
}

export default serverData;