import connection from "../connection/db.js";

const displayData = (req,res) =>{
    res.setHeader('Content-Type', 'application/json');
    const query = 'SELECT * FROM arduinodata';
    connection.query(query, (err, results) => {
        if (err) {
          console.error('Database query error:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json(results);
        }
      });
}

export default displayData;